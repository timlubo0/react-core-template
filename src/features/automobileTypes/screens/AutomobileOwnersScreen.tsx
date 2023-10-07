import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { IAutomobileOwner } from "../types";
import { IconTrash } from '@tabler/icons-react';
import { CrudActionProps } from "../../../components/CrudActionButtons";
import AutomobileOwnerFormModal from "../components/modals/AutomobileOwnerFormModal";
import { deleteModal } from "../../../utils/modal";
import { useAutomobileOwnerDelete } from "../hooks/automobileOwners";
import { toast } from "../../../utils/toast";
import AutomobileOwnersTable from "../components/tables/AutomobileOwnersTable";

function AutomobileOwnersScreen(){

  const automobileOwnerFormModal = useDisclosure(false);
  const [automobileOwner, setAutomobileOwner] = useState<IAutomobileOwner>();
  const [selectedAutomobileOwners, setSelectedAutomobileOwners] = useState<IAutomobileOwner[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = useAutomobileOwnerDelete({
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
            selectedAutomobileOwners.map((auto) => deleteMutation.mutate(`${auto.uid}`));
          },
        }),
    },
  ];

  const handleSelection = (automobileOwners: IAutomobileOwner[]) => {
    automobileOwners.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedAutomobileOwners(automobileOwners);
  }

  const handleEdit = (auto: IAutomobileOwner) => {
    setAutomobileOwner(auto);
    automobileOwnerFormModal[1].open();
  }

  const handleAdd = () => {
    setAutomobileOwner(undefined);
    automobileOwnerFormModal[1].open();
  }
  
  return (
    <Stack p={"lg"}>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouveau proprietaire d'une voiture"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <AutomobileOwnersTable
        onEdit={handleEdit}
        onSelect={handleSelection}
        filters={{ keyword: keyword }}
      />
      <AutomobileOwnerFormModal
        opened={automobileOwnerFormModal[0]}
        onClose={automobileOwnerFormModal[1].close}
        automobileOwner={automobileOwner}
      />
    </Stack>
  );
}

export default AutomobileOwnersScreen;