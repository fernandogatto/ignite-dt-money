import * as Dialog from '@radix-ui/react-dialog';
import { X } from "phosphor-react";
import { useContext } from 'react';
import { TransactionsContext } from '../../contexts/TransactionContext';

import { CloseButton, Content, Overlay } from './styles';

interface IDeleteTransactionModalProps {
  id: string;
}

export function DeleteTransactionModal(data: IDeleteTransactionModalProps) {
  const { deleteTransaction } = useContext(TransactionsContext);

  function handleDeleteTransaction() {
    deleteTransaction(data.id);
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Excluir Transação</Dialog.Title>

        <Dialog.Description>
          Tem certeza que deseja excluir esse item?
        </Dialog.Description>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <button id="delete-button" onClick={handleDeleteTransaction}>
          Excluir
        </button>
      </Content>
    </Dialog.Portal>
  )
}