import { Modal } from '@mantine/core';
import { IVehicleMark } from '../../types';
import { toast } from '../../../../utils/toast';
import VehicleUseForm from '../forms/VehicleUseForm';
import { useVehicleUsesMutation } from '../../hooks/vehicleUses';

interface Props{
    opened: boolean;
    onClose: () => void;
    vehicleUse?: IVehicleMark;
    centered?: boolean;  
}

function VehicleMarkFormModal({ opened, onClose, vehicleUse, centered = true }: Props) {

    const mutation = useVehicleUsesMutation({
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
      model: vehicleUse
    });

    const handleSubmit = (vehicleUse: IVehicleMark) => {
        mutation.mutate(vehicleUse);
    };

    return (
        <>
            <Modal 
                opened={opened}  
                onClose={onClose} 
                title="Types d'utilisation des vehicule"
                size={'lg'}
                centered={centered}
            >
                <VehicleUseForm onSubmit={handleSubmit} isLoading={mutation.isLoading} vehicleUse={vehicleUse} />
            </Modal>
        </>
    );
}

export default VehicleMarkFormModal;