import { Modal } from '@mantine/core';
import { IVehicle } from '../../types';
import { toast } from '../../../../utils/toast';
import VehicleForm from '../forms/VehicleForm';
import { useVehiclesMutation } from '../../hooks/vehicles';

interface Props{
    opened: boolean;
    onClose: () => void;
    vehicle?: IVehicle;
    centered?: boolean;  
}

function VehicleMarkFormModal({ opened, onClose, vehicle, centered = true }: Props) {

    const mutation = useVehiclesMutation({
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
      model: vehicle
    });

    const handleSubmit = (vehicle: IVehicle) => {
        mutation.mutate(vehicle);
    };

    return (
        <>
            <Modal 
                opened={opened}  
                onClose={onClose} 
                title="A propos du vehicule"
                size={'xxl'}
                centered={centered} 
            >
                <VehicleForm onSubmit={handleSubmit} isLoading={mutation.isLoading} vehicle={vehicle} />
            </Modal>
        </>
    );
}

export default VehicleMarkFormModal;