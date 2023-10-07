import { Modal } from '@mantine/core';
import { IStop } from '../../types';
import { toast } from '../../../../utils/toast';
import { useStopsMutation } from '../../hooks/stops';
import StopForm from '../forms/StopForm';

interface Props {
  opened: boolean;
  onClose: () => void;
  stop?: IStop;
  centered?: boolean;
}

function StopFormModal({ opened, onClose, stop, centered = true }: Props) {
  const mutation = useStopsMutation({
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
    model: stop,
  });

  const handleSubmit = (stop: IStop) => {
    mutation.mutate(stop);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title="Arret de bus"
        size={"lg"}
        centered={centered}
      >
        <StopForm
          onSubmit={handleSubmit}
          isLoading={mutation.isLoading}
          stop={stop}
        />
      </Modal>
    </>
  );
}

export default StopFormModal;