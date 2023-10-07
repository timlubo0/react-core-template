import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { IRaceType } from "../types";
import { CrudActionProps } from "../../../components/CrudActionButtons";
import RaceTypeFormModal from "../components/modals/RaceTypeFormModal";
import { useRaceTypeDelete } from "../hooks/raceTypes";
import { toast } from "../../../utils/toast";
import RaceTypesTable from "../components/tables/RaceTypesTable";
import { actions } from "../../../utils/actions";

function RaceTypesScreen(){

  const raceTypeFormModal = useDisclosure(false);
  const [raceType, setRaceType] = useState<IRaceType>();
  const [selectedRaceTypes, setSelectedRaceTypes] = useState<IRaceType[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = useRaceTypeDelete({
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
        selectedRaceTypes.map((raceType) =>
          deleteMutation.mutate(`${raceType.uid}`)
        ),
    }),
  ];

  const handleSelection = (raceTypes: IRaceType[]) => {
    raceTypes.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedRaceTypes(raceTypes);
  }

  const handleEdit = (auto: IRaceType) => {
    setRaceType(auto);
    raceTypeFormModal[1].open();
  }

  const handleAdd = () => {
    setRaceType(undefined);
    raceTypeFormModal[1].open();
  }
  
  return (
    <Stack p={"lg"}>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouveau type de course"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <RaceTypesTable
        onEdit={handleEdit}
        onSelect={handleSelection}
        filters={{ keyword: keyword }}
      />
      <RaceTypeFormModal
        opened={raceTypeFormModal[0]}
        onClose={raceTypeFormModal[1].close}
        raceType={raceType}
      />
    </Stack>
  );
}

export default RaceTypesScreen;