import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { IEarning } from "../types";
import { CrudActionProps } from "../../../components/CrudActionButtons";
import EarningFormModal from "../components/modals/EarningFormModal";
import { useEarningDelete } from "../hooks/earnings";
import { toast } from "../../../utils/toast";
import EarningsTable from "../components/tables/EarningsTable";
import { actions } from "../../../utils/actions";

function EarningsScreen(){

  const earningFormModal = useDisclosure(false);
  const [earning, setEarning] = useState<IEarning>();
  const [selectedEarnings, setSelectedEarnings] = useState<IEarning[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = useEarningDelete({
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
        selectedEarnings.map((earning) =>
          deleteMutation.mutate(`${earning.uid}`)
        ),
    }),
  ];

  const handleSelection = (earnings: IEarning[]) => {
    earnings.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedEarnings(earnings);
  }

  const handleEdit = (earning: IEarning) => {
    setEarning(earning);
    earningFormModal[1].open();
  }

  const handleAdd = () => {
    setEarning(undefined);
    earningFormModal[1].open();
  }
  
  return (
    <Stack p={"lg"}>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouveau gain"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
        canCreate={false}
      />
      <EarningsTable
        onEdit={handleEdit}
        onSelect={handleSelection}
        filters={{ keyword: keyword }}
      />
      <EarningFormModal
        opened={earningFormModal[0]}
        onClose={earningFormModal[1].close}
        earning={earning}
      />
    </Stack>
  );
}

export default EarningsScreen;