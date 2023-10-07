import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { IVehicleMark } from "../types";
import { IconTrash } from '@tabler/icons-react';
import { CrudActionProps } from "../../../components/CrudActionButtons";
import VehicleMarksTable from "../components/tables/VehicleMarksTable";
import VehicleMarkFormModal from "../components/modals/VehicleMarkFormModal";
import { deleteModal } from "../../../utils/modal";
import { useVehicleMarkDelete } from "../hooks/vehicleMarks";
import { toast } from "../../../utils/toast";

function VehicleMarksScreen(){

  const vehicleMarkFormModal = useDisclosure(false);
  const [vehicleMark, setVehicleMark] = useState<IVehicleMark>();
  const [selectedVehicleMarks, setSelectedVehicleMarks] = useState<IVehicleMark[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = useVehicleMarkDelete({
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
            selectedVehicleMarks.map((vehicleMark) => deleteMutation.mutate(`${vehicleMark.uid}`));
          },
        }),
    },
  ];

  const handleSelection = (vehicleMarks: IVehicleMark[]) => {
    vehicleMarks.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedVehicleMarks(vehicleMarks);
  }

  const handleEdit = (vehicleMark: IVehicleMark) => {
    setVehicleMark(vehicleMark);
    vehicleMarkFormModal[1].open();
  }

  const handleAdd = () => {
    setVehicleMark(undefined);
    vehicleMarkFormModal[1].open();
  }
  
  return (
    <Stack p={"lg"}>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouvelle marque de voiture"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <VehicleMarksTable
        onEdit={handleEdit}
        onSelect={handleSelection}
        filters={{ keyword: keyword }}
      />
      <VehicleMarkFormModal
        opened={vehicleMarkFormModal[0]}
        onClose={vehicleMarkFormModal[1].close}
        vehicleMark={vehicleMark}
      />
    </Stack>
  );
}

export default VehicleMarksScreen;