import { useState } from "react";
import { Modal, Button, Group } from "@mantine/core";

function MyModal({ children, open, handleClose }) {
  return (
    <>
      <Modal opened={open} onClose={handleClose} title="Scan QR Code">
        {children}
      </Modal>
    </>
  );
}
export default MyModal;
