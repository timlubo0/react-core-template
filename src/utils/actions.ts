import { IconTrash } from "@tabler/icons-react";
import { deleteModal } from "./modal";

interface DeleteProps{
    onConfirm: () => void;
}

export const actions =  {
    delete: ({ onConfirm }: DeleteProps) => (
        {
            title: "supprimer",
            icon: IconTrash,
            color: "red",
            onClick: () =>
            deleteModal.show({
                onConfirm: onConfirm,
            }),
            }
    ),
}