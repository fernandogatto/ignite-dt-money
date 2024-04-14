import * as Dialog from "@radix-ui/react-dialog";

import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionContext";

import { NewTransactionModal } from "../NewTransactionModal";

import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

import logoImg from "../../assets/logo.svg";

export function Header() {
  const { newTransactionModalIsOpen, setNewTransactionModalIsOpen } =
    useContext(TransactionsContext);

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="DT Money" />

        <Dialog.Root
          open={newTransactionModalIsOpen}
          onOpenChange={setNewTransactionModalIsOpen}
        >
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
