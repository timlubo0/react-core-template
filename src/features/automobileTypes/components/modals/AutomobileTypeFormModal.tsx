import { Modal } from '@mantine/core';
import { IAutomobileType } from '../../types';
import { toast } from '../../../../utils/toast';
import { useAutomobileTypesMutation } from '../../hooks/automobileTypes';
import AutomobileTypeForm from '../forms/AutomobileTypeForm';

interface Props{
    opened: boolean;
    onClose: () => void;
    automobileType?: IAutomobileType;
    centered?: boolean;  
}

function AutomobileTypeFormModal({ opened, onClose, automobileType, centered = true }: Props) {

    const mutation = useAutomobileTypesMutation({
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
      model: automobileType
    });

    const handleSubmit = (automobileType: IAutomobileType) => {
        mutation.mutate(automobileType);
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
                <AutomobileTypeForm onSubmit={handleSubmit} isLoading={mutation.isLoading} automobileType={automobileType} />
            </Modal>
        </>
    );
}

export default AutomobileTypeFormModal;