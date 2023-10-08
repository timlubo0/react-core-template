import { Modal } from "src/components/base";
import { ICompany } from "../../types";
import { toast } from "../../../../utils/toast";
import CompanyForm from "../forms/CompanyForm";
import { useCompaniesMutation } from "../../hooks/companies";

interface Props {
  opened: boolean;
  onClose: () => void;
  company?: ICompany;
  centered?: boolean;
}

function CompanyFormModal({
  opened,
  onClose,
  company,
  centered = true,
}: Props) {
  const mutation = useCompaniesMutation({
    onSuccess: (response) => {
      if (response.status === true) {
        onClose();
        toast.success();

        return null;
      }

      toast.error();
    },
    onError: () => {
      toast.error();
    },
    model: company,
  });

  const handleSubmit = (company: ICompany) => {
    console.log("read");
    mutation.mutate(company);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title="Entreprise"
        size={"lg"}
        centered={centered}
      >
        <CompanyForm
          onSubmit={handleSubmit}
          isLoading={mutation.isLoading}
          company={company}
        />
      </Modal>
    </>
  );
}

export default CompanyFormModal;
