import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { IStop } from "../types";
import { CrudActionProps } from "../../../components/CrudActionButtons";
import StopFormModal from "../components/modals/StopFormModal";
import { useStopDelete } from "../hooks/stops";
import { toast } from "../../../utils/toast";
import StopsTable from "../components/tables/StopsTable";
import { actions } from "../../../utils/actions";

function StopsScreen(){

  const stopFormModal = useDisclosure(false);
  const [stop, setStop] = useState<IStop>();
  const [selectedStops, setSelectedStops] = useState<IStop[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = useStopDelete({
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
        selectedStops.map((stop) =>
          deleteMutation.mutate(`${stop.uid}`)
        ),
    }),
  ];

  const handleSelection = (stops: IStop[]) => {
    stops.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedStops(stops);
  }

  const handleEdit = (auto: IStop) => {
    setStop(auto);
    stopFormModal[1].open();
  }

  const handleAdd = () => {
    setStop(undefined);
    stopFormModal[1].open();
  }
  
  return (
    <Stack p={"lg"}>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouvel arret de bus"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <StopsTable
        onEdit={handleEdit}
        onSelect={handleSelection}
        filters={{ keyword: keyword }}
      />
      <StopFormModal
        opened={stopFormModal[0]}
        onClose={stopFormModal[1].close}
        stop={stop}
      />
    </Stack>
  );
}

export default StopsScreen;