import { Modal } from '@mantine/core';
import { IVehicleMark } from '../../types';
import { toast } from '../../../../utils/toast';
import VehicleMarkForm from '../forms/VehicleMarkForm';
import { useVehicleMarksMutation } from '../../hooks/vehicleMarks';

interface Props{
    opened: boolean;
    onClose: () => void;
    vehicleMark?: IVehicleMark;
    centered?: boolean;  
}

function VehicleMarkFormModal({ opened, onClose, vehicleMark, centered = true }: Props) {

    const mutation = useVehicleMarksMutation({
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
      model: vehicleMark
    });

    const handleSubmit = (vehicleMark: IVehicleMark) => {
        mutation.mutate(vehicleMark);
    };

    return (
        <>
            <Modal 
                opened={opened} 
                onClose={onClose} 
                title="Type de vehicule"
                size={'lg'}
                centered={centered}
            >
                <VehicleMarkForm onSubmit={handleSubmit} isLoading={mutation.isLoading} vehicleMark={vehicleMark} />
            </Modal>
        </>
    );
}

export default VehicleMarkFormModal; 