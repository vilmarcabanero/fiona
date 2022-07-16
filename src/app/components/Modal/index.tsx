import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
export default function CustomModal(props: any) {
  const { modal } = props;

  return (
    <div>
      {modal.button}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modal.open}
        onClose={modal.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal.open}>
          <Box sx={modal.style}>{props.children}</Box>
        </Fade>
      </Modal>
    </div>
  );
}
