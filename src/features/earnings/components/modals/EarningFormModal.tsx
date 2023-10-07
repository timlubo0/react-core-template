import { Modal } from '@mantine/core';
import { IEarning } from '../../types';
import { toast } from '../../../../utils/toast';
import { useEarningsMutation } from '../../hooks/earnings';
import EarningForm from '../forms/EarningForm';

interface Props {
  opened: boolean;
  onClose: () => void;
  earning?: IEarning;
  centered?: boolean;
}

function EarningFormModal({ opened, onClose, earning, centered = true }: Props) {
  const mutation = useEarningsMutation({
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
    model: earning,
  });

  const handleSubmit = (earning: IEarning) => {
    mutation.mutate(earning);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title="Gains"
        size={"lg"}
        centered={centered}
      >
        <EarningForm
          onSubmit={handleSubmit}
          isLoading={mutation.isLoading}
          earning={earning}
        />
      </Modal>
    </>
  );
}

export default EarningFormModal;