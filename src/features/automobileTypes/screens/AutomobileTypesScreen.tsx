import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { IAutomobileType } from "../types";
import { IconTrash } from '@tabler/icons-react';
import { CrudActionProps } from "../../../components/CrudActionButtons";
import AutomobileTypeFormModal from "../components/modals/AutomobileTypeFormModal";
import { deleteModal } from "../../../utils/modal";
import { useAutomobileTypeDelete } from "../hooks/automobileTypes";
import { toast } from "../../../utils/toast";
import AutomobileTypesTable from "../components/tables/AutomobileTypesTable";

function AutomobileTypesScreen(){

  const automobileTypeFormModal = useDisclosure(false);
  const [automobileType, setAutomobileType] = useState<IAutomobileType>();
  const [selectedAutomobileTypes, setSelectedAutomobileTypes] = useState<IAutomobileType[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = useAutomobileTypeDelete({
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
    {
      title: "supprimer",
      icon: IconTrash,
      color: "red",
      onClick: () =>
        deleteModal.show({
          onConfirm: () => {
            selectedAutomobileTypes.map((auto) => deleteMutation.mutate(`${auto.uid}`));
          },
        }),
    },
  ];

  const handleSelection = (automobileTypes: IAutomobileType[]) => {
    automobileTypes.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedAutomobileTypes(automobileTypes);
  }

  const handleEdit = (auto: IAutomobileType) => {
    setAutomobileType(auto);
    automobileTypeFormModal[1].open();
  }

  const handleAdd = () => {
    setAutomobileType(undefined);
    automobileTypeFormModal[1].open();
  }
  
  return (
    <Stack p={"lg"}>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouveau type d'automobile"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <AutomobileTypesTable
        onEdit={handleEdit}
        onSelect={handleSelection}
        filters={{ keyword: keyword }}
      />
      <AutomobileTypeFormModal
        opened={automobileTypeFormModal[0]}
        onClose={automobileTypeFormModal[1].close}
        automobileType={automobileType}
      />
    </Stack>
  );
}

export default AutomobileTypesScreen;