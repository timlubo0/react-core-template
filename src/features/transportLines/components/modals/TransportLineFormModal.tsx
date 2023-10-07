import { Modal } from '@mantine/core';
import { ITransportLine } from '../../types';
import { toast } from '../../../../utils/toast';
import { useTransportLinesMutation } from '../../hooks/transportLines';
import TransportLineForm from '../forms/TransportLineForm';

interface Props {
  opened: boolean;
  onClose: () => void;
  transportLine?: ITransportLine;
  centered?: boolean;
}

function TransportLineFormModal({ opened, onClose, transportLine, centered = true }: Props) {
  const mutation = useTransportLinesMutation({
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
    model: transportLine,
  });

  const handleSubmit = (transportLine: ITransportLine) => {
    mutation.mutate(transportLine);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title="Ligne de transport"
        size={"lg"}
        centered={centered}
      >
        <TransportLineForm
          onSubmit={handleSubmit}
          isLoading={mutation.isLoading}
          transportLine={transportLine}
        />
      </Modal>
    </>
  );
}

export default TransportLineFormModal;