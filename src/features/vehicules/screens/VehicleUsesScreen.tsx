import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { IVehicleUse } from "../types";
import { IconTrash } from '@tabler/icons-react';
import { CrudActionProps } from "../../../components/CrudActionButtons";
import VehicleUsesTable from "../components/tables/VehicleUsesTable";
import VehicleUseFormModal from "../components/modals/VehicleUseFormModal";
import { deleteModal } from "../../../utils/modal";
import { useVehicleUseDelete } from "../hooks/vehicleUses";
import { toast } from "../../../utils/toast";

function VehicleUsesScreen(){

  const vehicleUseFormModal = useDisclosure(false);
  const [vehicleUse, setVehicleUse] = useState<IVehicleUse>();
  const [selectedVehicleUses, setSelectedVehicleUses] = useState<IVehicleUse[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = useVehicleUseDelete({
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
            selectedVehicleUses.map((vehicleUse) => deleteMutation.mutate(`${vehicleUse.uid}`));
          },
        }),
    },
  ];

  const handleSelection = (vehicleUses: IVehicleUse[]) => {
    vehicleUses.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedVehicleUses(vehicleUses);
  }

  const handleEdit = (vehicleUse: IVehicleUse) => {
    setVehicleUse(vehicleUse);
    vehicleUseFormModal[1].open();
  }

  const handleAdd = () => {
    setVehicleUse(undefined);
    vehicleUseFormModal[1].open();
  }
  
  return (
    <Stack p={"lg"}>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouveau Type d'utilisation du vehicule"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <VehicleUsesTable
        onEdit={handleEdit}
        onSelect={handleSelection}
        filters={{ keyword: keyword }}
      />
      <VehicleUseFormModal
        opened={vehicleUseFormModal[0]}
        onClose={vehicleUseFormModal[1].close}
        vehicleUse={vehicleUse}
      />
    </Stack>
  );
}

export default VehicleUsesScreen;