import { Modal } from '@mantine/core';
import { IVehicleMark } from '../../types';
import { toast } from '../../../../utils/toast';
import VehicleEnergyForm from '../forms/VehicleEnergyForm';
import { useVehicleEnergiesMutation } from '../../hooks/vehicleEnergies';

interface Props{
    opened: boolean;
    onClose: () => void;
    vehicleEnergy?: IVehicleMark;
    centered?: boolean;  
}

function VehicleMarkFormModal({ opened, onClose, vehicleEnergy, centered = true }: Props) {

    const mutation = useVehicleEnergiesMutation({
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
      model: vehicleEnergy
    });

    const handleSubmit = (vehicleEnergy: IVehicleMark) => {
        mutation.mutate(vehicleEnergy);
    };

    return (
        <>
            <Modal 
                opened={opened} 
                onClose={onClose} 
                title="Types des carburants"
                size={'lg'}
                centered={centered} 
            >
                <VehicleEnergyForm onSubmit={handleSubmit} isLoading={mutation.isLoading} vehicleEnergy={vehicleEnergy}/>
            </Modal>
        </>
    );
}

export default VehicleMarkFormModal;