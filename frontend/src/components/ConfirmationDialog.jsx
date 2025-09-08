import React from 'react';
import styled from 'styled-components';
import Modal from '../Modal'; 

const DialogContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Message = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  
  &.confirm {
    background-color: #dc3545; // Red for confirm delete
    color: white;
  }

  &.cancel {
    background-color: #6c757d; // Gray for cancel
    color: white;
  }
`;

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <Modal onClose={onCancel}>
      <DialogContainer>
        <Message>{message}</Message>
        <ButtonContainer>
          <Button className="cancel" onClick={onCancel}>Cancelar</Button>
          <Button className="confirm" onClick={onConfirm}>Confirmar</Button>
        </ButtonContainer>
      </DialogContainer>
    </Modal>
  );
};

export default ConfirmationDialog;
