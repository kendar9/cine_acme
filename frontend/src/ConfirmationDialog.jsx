import React from 'react';
import { Button } from './Users.styles';
import { DialogContainer, Message, ButtonContainer } from './ConfirmationDialog.styles';

function ConfirmationDialog({ message, onConfirm, onCancel }) {
    return (
        <DialogContainer>
            <Message>{message}</Message>
            <ButtonContainer>
                <Button onClick={onCancel}>Cancelar</Button>
                <Button className="delete" onClick={onConfirm}>Confirmar</Button>
            </ButtonContainer>
        </DialogContainer>
    );
}

export default ConfirmationDialog;
