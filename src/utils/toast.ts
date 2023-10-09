import { toast as tToast } from "react-toastify";

interface Props {
  title?: string;
  message: string;
  color?: "success" | "error" | "warning" | "red" | "green";
}

export const toast = {
  show: ({ message, color = "success" }: Props) =>
    color === "success" ? tToast.success(message) : tToast.error(message),
  success: (message?: string) =>
    tToast.success(message || "Enregistrement reussi"),
  error: (message?: string) =>
    tToast.error(message || "Echec d'enregistrement"),
};
