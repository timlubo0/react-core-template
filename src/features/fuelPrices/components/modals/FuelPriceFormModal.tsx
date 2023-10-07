import { Modal } from '@mantine/core';
import { IFuelPrice } from '../../types';
import { toast } from '../../../../utils/toast';
import { useFuelPricesMutation } from '../../hooks/fuelPrices';
import FuelPriceForm from '../forms/FuelPriceForm';

interface Props {
  opened: boolean;
  onClose: () => void;
  fuelPrice?: IFuelPrice;
  centered?: boolean;
}

function FuelPriceFormModal({ opened, onClose, fuelPrice, centered = true }: Props) {
  const mutation = useFuelPricesMutation({
    onSuccess: (response) => {
      if (response.status === true) {
        onClose();
        toast.success();

        return null;
      }

      toast.error();
    },
    onError: () => {
      toast.error();
    },
    model: fuelPrice,
  });

  const handleSubmit = (fuelPrice: IFuelPrice) => {
    mutation.mutate(fuelPrice);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title="Prix du carburant"
        size={"lg"}
        centered={centered}
      >
        <FuelPriceForm
          onSubmit={handleSubmit}
          isLoading={mutation.isLoading}
          fuelPrice={fuelPrice}
        />
      </Modal>
    </>
  );
}

export default FuelPriceFormModal;