import { Typography, Modal } from '@mui/material';

function ApiError({ message, open, onClose }) {

  const handleCloseModal = () => {
      setOpenModal(false);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        <Typography variant="h4">
          {message}
        </Typography>
      </div>
    </Modal>
  );
}

export default ApiError;
