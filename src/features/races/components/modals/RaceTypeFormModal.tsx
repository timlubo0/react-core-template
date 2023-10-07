import { Modal } from '@mantine/core';
import { IRaceType } from '../../types';
import { toast } from '../../../../utils/toast';
import { useRaceTypesMutation } from '../../hooks/raceTypes';
import RaceTypeForm from '../forms/RaceTypeForm';

interface Props{
    opened: boolean;
    onClose: () => void;
    raceType?: IRaceType;
    centered?: boolean;  
}

function RaceTypeFormModal({ opened, onClose, raceType, centered = true }: Props) {

    const mutation = useRaceTypesMutation({
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
      model: raceType
    });

    const handleSubmit = (raceType: IRaceType) => {
        mutation.mutate(raceType);
    };

    return (
      <>
        <Modal
          opened={opened}
          onClose={onClose}
          title="Type de course"
          size={"lg"}
          centered={centered}
        >
          <RaceTypeForm
            onSubmit={handleSubmit}
            isLoading={mutation.isLoading}
            raceType={raceType}
          />
        </Modal>
      </>
    );
}

export default RaceTypeFormModal;