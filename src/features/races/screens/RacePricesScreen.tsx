import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { IRacePrice } from "../types";
import { CrudActionProps } from "../../../components/CrudActionButtons";
import RacePriceFormModal from "../components/modals/RacePriceFormModal";
import { useRacePriceDelete } from "../hooks/racePrices";
import { toast } from "../../../utils/toast";
import RacePricesTable from "../components/tables/RacePricesTable";
import { actions } from "../../../utils/actions";

function RacePricesScreen(){

  const racePriceFormModal = useDisclosure(false);
  const [racePrice, setRacePrice] = useState<IRacePrice>();
  const [selectedRacePrices, setSelectedRacePrices] = useState<IRacePrice[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = useRacePriceDelete({
    onSuccess: (response) => {
      if(response.status === true){
        toast.success();
        return null;
      }

      toast.error();
    },
    onError: (errors) => {},
  });

  const crudActions: CrudActionProps[] = [
    actions.delete({
      onConfirm: () =>
        selectedRacePrices.map((racePrice) =>
          deleteMutation.mutate(`${racePrice.uid}`)
        ),
    }),
  ];

  const handleSelection = (racePrices: IRacePrice[]) => {
    racePrices.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedRacePrices(racePrices);
  }

  const handleEdit = (auto: IRacePrice) => {
    setRacePrice(auto);
    racePriceFormModal[1].open();
  }

  const handleAdd = () => {
    setRacePrice(undefined);
    racePriceFormModal[1].open();
  }
  
  return (
    <Stack p={"lg"}>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouveau prix de course"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <RacePricesTable
        onEdit={handleEdit}
        onSelect={handleSelection}
        filters={{ keyword: keyword }}
      />
      <RacePriceFormModal
        opened={racePriceFormModal[0]}
        onClose={racePriceFormModal[1].close}
        racePrice={racePrice}
      />
    </Stack>
  );
}

export default RacePricesScreen;