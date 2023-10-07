import { Modal } from '@mantine/core';
import { IRacePrice } from '../../types';
import { toast } from '../../../../utils/toast';
import { useRacePricesMutation } from '../../hooks/racePrices';
import RacePriceForm from '../forms/RacePriceForm';

interface Props{
    opened: boolean;
    onClose: () => void;
    racePrice?: IRacePrice;
    centered?: boolean;  
}

function RacePriceFormModal({ opened, onClose, racePrice, centered = true }: Props) {

  const mutation = useRacePricesMutation({
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
    model: racePrice
  });

  const handleSubmit = (racePrice: IRacePrice) => {
    mutation.mutate(racePrice);
  };

    return (
      <>
        <Modal
          opened={opened}
          onClose={onClose}
          title="Prix des courses"
          size={"xl"}
          centered={centered}
        >
          <RacePriceForm
            onSubmit={handleSubmit}
            isLoading={mutation.isLoading}
            racePrice={racePrice}
          />
        </Modal>
      </>
    );
}

export default RacePriceFormModal;