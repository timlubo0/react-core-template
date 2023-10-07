import { Modal } from '@mantine/core';
import { IDriver } from '../../types';
import { toast } from '../../../../utils/toast';
import DriverForm from '../forms/DriverForm';
import { useDriversMutation } from '../../hooks/drivers';

interface Props{
    opened: boolean;
    onClose: () => void;
    driver?: IDriver;
    centered?: boolean;  
}

function DriverFormModal({ opened, onClose, driver, centered = true }: Props) {

    const mutation = useDriversMutation({
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
      model: driver
    });

    const handleSubmit = (driver: IDriver) => {
        mutation.mutate(driver);
    };

    return (
        <>
            <Modal 
                opened={opened} 
                onClose={onClose} 
                title="Chauffeur"
                size={'lg'}
                centered={centered}
            >
                <DriverForm onSubmit={handleSubmit} isLoading={mutation.isLoading} driver={driver} />
            </Modal>
        </>
    );
}

export default DriverFormModal;