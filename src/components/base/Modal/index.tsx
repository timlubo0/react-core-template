import {
  Modal as MModal,
  ModalBaseCloseButtonProps,
  ModalBaseOverlayProps,
  ModalRootProps,
} from "@mantine/core";

export interface ModalProps extends ModalRootProps {
  __staticSelector?: string;
  title?: React.ReactNode;
  withOverlay?: boolean;
  overlayProps?: ModalBaseOverlayProps;
  children?: React.ReactNode;
  withCloseButton?: boolean;
  closeButtonProps?: ModalBaseCloseButtonProps;
}

export const Modal = (props: ModalProps) => <MModal {...props} />;
