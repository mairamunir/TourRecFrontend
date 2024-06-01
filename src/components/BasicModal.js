import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TransportCard from './TransportCard'; // Assuming you have a TransportCard component

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BasicModal = ({ isOpen, onClose, cards }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Modal Title
        </Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {cards.map((card) => (
            <div key={card.id} style={{ width: '50%', margin: '10px' }}>
              <TransportCard card={card} />
            </div>
          ))}
        </div>
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default BasicModal;
