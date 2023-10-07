import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { IFuelPrice } from "../types";
import { CrudActionProps } from "../../../components/CrudActionButtons";
import FuelPriceFormModal from "../components/modals/FuelPriceFormModal";
import { useFuelPriceDelete } from "../hooks/fuelPrices";
import { toast } from "../../../utils/toast";
import FuelPricesTable from "../components/tables/FuelPricesTable";
import { actions } from "../../../utils/actions";

function FuelPricesScreen(){

  const fuelPriceFormModal = useDisclosure(false);
  const [fuelPrice, setFuelPrice] = useState<IFuelPrice>();
  const [selectedFuelPrices, setSelectedFuelPrices] = useState<IFuelPrice[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = useFuelPriceDelete({
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
        selectedFuelPrices.map((fuelPrice) =>
          deleteMutation.mutate(`${fuelPrice.uid}`)
        ),
    }),
  ];

  const handleSelection = (fuelPrices: IFuelPrice[]) => {
    fuelPrices.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedFuelPrices(fuelPrices);
  }

  const handleEdit = (auto: IFuelPrice) => {
    setFuelPrice(auto);
    fuelPriceFormModal[1].open();
  }

  const handleAdd = () => {
    setFuelPrice(undefined);
    fuelPriceFormModal[1].open();
  }
  
  return (
    <Stack p={"lg"}>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouveau prix"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <FuelPricesTable
        onEdit={handleEdit}
        onSelect={handleSelection}
        filters={{ keyword: keyword }}
      />
      <FuelPriceFormModal
        opened={fuelPriceFormModal[0]}
        onClose={fuelPriceFormModal[1].close}
        fuelPrice={fuelPrice}
      />
    </Stack>
  );
}

export default FuelPricesScreen;