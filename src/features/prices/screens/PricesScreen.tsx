import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { IPrice } from "../types";
import { IconTrash } from '@tabler/icons-react';
import { CrudActionProps } from "../../../components/CrudActionButtons";
import PricesTable from "../components/tables/PricesTable";
import PriceFormModal from "../components/modals/PriceFormModal";
import { deleteModal } from "../../../utils/modal";
import { usePriceDelete } from "../hooks/prices";
import { toast } from "../../../utils/toast";

function PricesScreen(){

  const priceFormModal = useDisclosure(false);
  const [price, setPrice] = useState<IPrice>();
  const [selectedPrices, setSelectedPrices] = useState<IPrice[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = usePriceDelete({
    onSuccess: (response) => {
      if(response.status === true){
        toast.success();
        return null;
      }

      toast.error();
    },
    onError: (errors) => {},
  });

  const crudActions: CrudActionProps[] = [
    {
      title: "supprimer",
      icon: IconTrash,
      color: "red",
      onClick: () =>
        deleteModal.show({
          onConfirm: () => {
            selectedPrices.map((price) => deleteMutation.mutate(`${price.uid}`));
          },
        }),
    },
  ];

  const handleSelection = (prices: IPrice[]) => {
    prices.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedPrices(prices);
  }

  const handleEdit = (price: IPrice) => {
    setPrice(price);
    priceFormModal[1].open();
  }

  const handleAdd = () => {
    setPrice(undefined);
    priceFormModal[1].open();
  }
  
  return (
    <Stack p={"lg"}>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouveau prix"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <PricesTable
        onEdit={handleEdit}
        onSelect={handleSelection}
        filters={{ keyword: keyword }}
      />
      <PriceFormModal
        opened={priceFormModal[0]}
        onClose={priceFormModal[1].close}
        price={price}
      />
    </Stack>
  );
}

export default PricesScreen;