import { Modal } from '@mantine/core';
import { IRace } from '../../types';
import { toast } from '../../../../utils/toast';
import { useRacesMutation } from '../../hooks/races';
import RaceForm from '../forms/RaceForm';

interface Props{
    opened: boolean;
    onClose: () => void;
    race?: IRace;
    centered?: boolean;  
}

function RaceFormModal({ opened, onClose, race, centered = true }: Props) {

    const mutation = useRacesMutation({
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
      model: race
    });

    const handleSubmit = (race: IRace) => {
        mutation.mutate(race);
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
                <RaceForm onSubmit={handleSubmit} isLoading={mutation.isLoading} race={race} />
            </Modal>
        </>
    );
}

export default RaceFormModal;