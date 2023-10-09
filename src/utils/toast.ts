import { toast as tToast } from "react-toastify";

interface Props {
  title?: string;
  message: string;
  color?: "success" | "error" | "warning" | "red" | "green";
}

export const toast = {
  show: ({ message, color = "success" }: Props) =>
    color === "success" ? tToast.success(message) : tToast.error(message),
  success: () => tToast.success("Enregistrement reussi"),
  error: () => tToast.error("Echec d'enregistrement"),
};
