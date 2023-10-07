import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { IReport } from "../types";
import { IconTrash } from '@tabler/icons-react';
import { CrudActionProps } from "../../../components/CrudActionButtons";
import { deleteModal } from "../../../utils/modal";
import { toast } from "../../../utils/toast";
import ReportsTable from "../components/tables/ReportsTable";

function ReportsScreen(){ 

  const reportFormModal = useDisclosure(false);
  const [report, setReport] = useState<IReport>();
  const [selectedReports, setSelectedReports] = useState<IReport[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

 

  

  const handleSelection = (reports: IReport[]) => {
    reports.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedReports(reports);
  }

  const handleEdit = (report: IReport) => {
    setReport(report);
    reportFormModal[1].open();
  }

  const handleAdd = () => {
    setReport(undefined);
    reportFormModal[1].open();
  }
  
  return (
    <Stack p={"lg"}>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Tableau de rapport"
       
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <ReportsTable onEdit={handleEdit} onSelect={handleSelection} filters={{keyword: keyword}} />
    </Stack>
  );
}

export default ReportsScreen;