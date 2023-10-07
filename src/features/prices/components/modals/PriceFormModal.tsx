import { Modal } from '@mantine/core';
import { IPrice } from '../../types';
import { toast } from '../../../../utils/toast';
import PriceForm from '../forms/PriceForm';
import { usePricesMutation } from '../../hooks/prices';

interface Props{
    opened: boolean;
    onClose: () => void;
    price?: IPrice;
    centered?: boolean;  
}

function PriceFormModal({ opened, onClose, price, centered = true }: Props) {

    const mutation = usePricesMutation({
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
      model: price
    });

    const handleSubmit = (price: IPrice) => {
        mutation.mutate(price);
    };

    return (
        <>
            <Modal 
                opened={opened} 
                onClose={onClose} 
                title="Prix"
                size={'lg'}
                centered={centered}
            >
                <PriceForm onSubmit={handleSubmit} isLoading={mutation.isLoading} price={price} />
            </Modal>
        </>
    );
}

export default PriceFormModal;