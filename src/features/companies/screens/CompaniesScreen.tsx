import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { ICompany } from "../types";
import { IconTrash } from '@tabler/icons-react';
import { CrudActionProps } from "../../../components/CrudActionButtons";
import CurrenciesTable from "../components/tables/CompaniesTable";
import CompanyFormModal from "../components/modals/CompanyFormModal";
import { deleteModal } from "../../../utils/modal";
import { useCompanyDelete } from "../hooks/companies";
import { toast } from "../../../utils/toast";

function CompaniesScreen(){

  const companyFormModal = useDisclosure(false);
  const [company, setCompany] = useState<ICompany>();
  const [selectedCompanies, setSelectedCompanies] = useState<ICompany[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = useCompanyDelete({
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
            selectedCompanies.map((company) => deleteMutation.mutate(`${company.uid}`));
          },
        }),
    },
  ];

  const handleSelection = (companies: ICompany[]) => {
    companies.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedCompanies(companies);
  }

  const handleEdit = (company: ICompany) => {
    setCompany(company);
    companyFormModal[1].open();
  }

  const handleAdd = () => {
    setCompany(undefined);
    companyFormModal[1].open();
  }
  
  return (
    <Stack p={"lg"}>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouvelle entreprise"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <CurrenciesTable onEdit={handleEdit} onSelect={handleSelection} filters={{keyword: keyword}} />
      <CompanyFormModal
        opened={companyFormModal[0]}
        onClose={companyFormModal[1].close}
        company={company}
      />
    </Stack>
  );
}

export default CompaniesScreen;