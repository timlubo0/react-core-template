import { Modal } from '@mantine/core';
import { IAutomobileOwner } from '../../types';
import { toast } from '../../../../utils/toast';
import { useAutomobileOwnersMutation } from '../../hooks/automobileOwners';
import AutomobileOwnerForm from '../forms/AutomobileOwnerForm';

interface Props{
    opened: boolean;
    onClose: () => void;
    automobileOwner?: IAutomobileOwner;
    centered?: boolean;  
}

function AutomobileOwnerFormModal({ opened, onClose, automobileOwner, centered = true }: Props) {

    const mutation = useAutomobileOwnersMutation({
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
      model: automobileOwner
    });

    const handleSubmit = (automobileOwner: IAutomobileOwner) => {
        mutation.mutate(automobileOwner);
    };

    return (
        <>
            <Modal 
                opened={opened} 
                onClose={onClose} 
                title="Type d'automobile"
                size={'lg'}
                centered={centered}
            >
                <AutomobileOwnerForm onSubmit={handleSubmit} isLoading={mutation.isLoading} automobileOwner={automobileOwner} />
            </Modal>
        </>
    );
}

export default AutomobileOwnerFormModal;