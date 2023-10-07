import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { IDriver } from "../types";
import { IconTrash } from '@tabler/icons-react';
import { CrudActionProps } from "../../../components/CrudActionButtons";
import DriversTable from "../components/tables/DriversTable";
import DriverFormModal from "../components/modals/DriverFormModal";
import { deleteModal } from "../../../utils/modal";
import { useDriverDelete } from "../hooks/drivers";
import { toast } from "../../../utils/toast";

function DriversScreen(){

  const driverFormModal = useDisclosure(false);
  const [driver, setDriver] = useState<IDriver>();
  const [selectedDrivers, setSelectedDrivers] = useState<IDriver[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = useDriverDelete({
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
            selectedDrivers.map((driver) => deleteMutation.mutate(`${driver.uid}`));
          },
        }),
    },
  ];

  const handleSelection = (drivers: IDriver[]) => {
    drivers.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedDrivers(drivers);
  }

  const handleEdit = (driver: IDriver) => {
    setDriver(driver);
    driverFormModal[1].open();
  }

  const handleAdd = () => {
    setDriver(undefined);
    driverFormModal[1].open();
  }
  
  return (
    <Stack p={"lg"}>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouveau chauffeur"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <DriversTable
        onEdit={handleEdit}
        onSelect={handleSelection}
        filters={{ keyword: keyword }}
      />
      <DriverFormModal
        opened={driverFormModal[0]}
        onClose={driverFormModal[1].close}
        driver={driver}
      />
    </Stack>
  );
}

export default DriversScreen;