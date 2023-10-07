import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { IVehicle } from "../types";
import { IconTrash } from '@tabler/icons-react';
import { CrudActionProps } from "../../../components/CrudActionButtons";
import VehiclesTable from "../components/tables/VehiclesTable";
import VehicleFormModal from "../components/modals/VehicleFormModal";
import { deleteModal } from "../../../utils/modal";
import { useVehicleDelete } from "../hooks/vehicles";
import { toast } from "../../../utils/toast";

function VehiclesScreen(){

  const vehicleFormModal = useDisclosure(false);
  const [vehicle, setVehicle] = useState<IVehicle>();
  const [selectedVehicles, setSelectedVehicles] = useState<IVehicle[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = useVehicleDelete({
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
            selectedVehicles.map((vehicle) => deleteMutation.mutate(`${vehicle.uid}`));
          },
        }),
    },
  ];

  const handleSelection = (vehicles: IVehicle[]) => {
    vehicles.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedVehicles(vehicles);
  }

  const handleEdit = (vehicle: IVehicle) => {
    setVehicle(vehicle);
    vehicleFormModal[1].open();
  }

  const handleAdd = () => {
    setVehicle(undefined);
    vehicleFormModal[1].open();
  }
  
  return (
    <Stack p={"lg"}>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouveau vehicule"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <VehiclesTable
        onEdit={handleEdit}
        onSelect={handleSelection}
        filters={{ keyword: keyword }}
      />
      <VehicleFormModal
        opened={vehicleFormModal[0]}
        onClose={vehicleFormModal[1].close}
        vehicle={vehicle}
      />
    </Stack>
  );
}

export default VehiclesScreen;