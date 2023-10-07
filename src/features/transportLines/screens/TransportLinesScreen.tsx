import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { ITransportLine } from "../types";
import { CrudActionProps } from "../../../components/CrudActionButtons";
import TransportLineFormModal from "../components/modals/TransportLineFormModal";
import { useTransportLineDelete } from "../hooks/transportLines";
import { toast } from "../../../utils/toast";
import TransportLinesTable from "../components/tables/TransportLinesTable";
import { actions } from "../../../utils/actions";

function TransportLinesScreen(){

  const transportLineFormModal = useDisclosure(false);
  const [transportLine, setTransportLine] = useState<ITransportLine>();
  const [selectedTransportLines, setSelectedTransportLines] = useState<ITransportLine[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = useTransportLineDelete({
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
        selectedTransportLines.map((transportLine) =>
          deleteMutation.mutate(`${transportLine.uid}`)
        ),
    }),
  ];

  const handleSelection = (transportLines: ITransportLine[]) => {
    transportLines.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedTransportLines(transportLines);
  }

  const handleEdit = (transportLine: ITransportLine) => {
    setTransportLine(transportLine);
    transportLineFormModal[1].open();
  }

  const handleAdd = () => {
    setTransportLine(undefined);
    transportLineFormModal[1].open();
  }
  
  return (
    <Stack p={"lg"}>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouvelle ligne de transport"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <TransportLinesTable
        onEdit={handleEdit}
        onSelect={handleSelection}
        filters={{ keyword: keyword }}
      />
      <TransportLineFormModal
        opened={transportLineFormModal[0]}
        onClose={transportLineFormModal[1].close}
        transportLine={transportLine}
      />
    </Stack>
  );
}

export default TransportLinesScreen;