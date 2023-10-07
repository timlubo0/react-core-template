import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { IVehicleEnergy } from "../types";
import { IconTrash } from '@tabler/icons-react';
import { CrudActionProps } from "../../../components/CrudActionButtons";
import VehicleEnergiesTable from "../components/tables/VehicleEnergiesTable";
import VehicleEnergyFormModal from "../components/modals/VehicleEnergyFormModal";
import { deleteModal } from "../../../utils/modal";
import { useVehicleEnergyDelete } from "../hooks/vehicleEnergies";
import { toast } from "../../../utils/toast";

function VehicleEnergiesScreen(){

  const vehicleEnergyFormModal = useDisclosure(false);
  const [vehicleEnergy, setVehicleEnergy] = useState<IVehicleEnergy>();
  const [selectedVehicleEnergies, setSelectedVehicleEnergies] = useState<IVehicleEnergy[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = useVehicleEnergyDelete({
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
            selectedVehicleEnergies.map((vehicleEnergy) => deleteMutation.mutate(`${vehicleEnergy.uid}`));
          },
        }),
    },
  ];

  const handleSelection = (vehicleEnergies: IVehicleEnergy[]) => {
    vehicleEnergies.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedVehicleEnergies(vehicleEnergies);
  }

  const handleEdit = (vehicleEnergy: IVehicleEnergy) => {
    setVehicleEnergy(vehicleEnergy);
    vehicleEnergyFormModal[1].open();
  }

  const handleAdd = () => {
    setVehicleEnergy(undefined);
    vehicleEnergyFormModal[1].open();
  }
  
  return (
    <Stack p={"lg"}>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouveau Type de carburant"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <VehicleEnergiesTable
        onEdit={handleEdit}
        onSelect={handleSelection}
        filters={{ keyword: keyword }}
      />
      <VehicleEnergyFormModal
        opened={vehicleEnergyFormModal[0]}
        onClose={vehicleEnergyFormModal[1].close}
        vehicleEnergy={vehicleEnergy}
      />
    </Stack>
  );
}

export default VehicleEnergiesScreen;