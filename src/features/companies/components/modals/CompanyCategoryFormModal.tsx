import { Modal } from '@mantine/core';
import { ICompanyCategory } from '../../types';
import { toast } from '../../../../utils/toast';
import CompanyCategoryForm from '../forms/CompanyCategoryForm';
import { useCompanyCategoriesMutation } from '../../hooks/companyCategories';

interface Props{
    opened: boolean;
    onClose: () => void;
    category?: ICompanyCategory; 
    centered?: boolean; 
}

function CompanyCategoryFormModal({ opened, onClose, category, centered = true }: Props) {

  const mutation = useCompanyCategoriesMutation({
    onSuccess: (response) => {
      if(response.status === true){
        onClose();
        toast.success();
        
        return null;
      }

      toast.error();
    },
    onError: () => {
      toast.error();
    },
    model: category
  });

  const handleSubmit = (category: ICompanyCategory) => {
      mutation.mutate(category);
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
        <CompanyCategoryForm
          onSubmit={handleSubmit}
          isLoading={mutation.isLoading}
          category={category}
        />
      </Modal>
    </>
  );
}

export default CompanyCategoryFormModal;