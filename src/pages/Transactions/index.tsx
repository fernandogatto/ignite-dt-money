import { useContext } from "react";
import { Pencil, Trash } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { UpdateTransactionModal } from "../../components/UpdateTransactionModal";
import { DeleteTransactionModal } from "../../components/DeleteTransactionModal";

import { TransactionsContext } from "../../contexts/TransactionContext";

import { IconButton, PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";
import { dateFormatter, priceFormatter } from "../../utils/formatter";

export function Transactions() {
  const { isLoading, hasError, transactions, updateTransactionModalIsOpen, setUpdateTransactionModalIsOpen, deleteTransactionModalIsOpen, setDeleteTransactionModalIsOpen, setMyCurrentTransaction } = useContext(TransactionsContext);

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        
        <TransactionsTable>
          <tbody>
            {!isLoading && !hasError && transactions.map(item => (
              <tr key={item.id}>
                <td width="50%">{item.description}</td>
                <td>
                  <PriceHighlight variant={item.type}>
                    {item.type === 'outcome' && '- '}
                    {priceFormatter.format(item.price)}
                  </PriceHighlight>
                </td>
                <td>{item.category}</td>
                <td>{dateFormatter.format(new Date(item.createdAt))}</td>
                <td>
                  <Dialog.Root open={updateTransactionModalIsOpen} onOpenChange={setUpdateTransactionModalIsOpen}>
                    <Dialog.Trigger asChild>
                      <IconButton variant="update" onClick={() => setMyCurrentTransaction(item)}>
                        <Pencil size={20} />
                      </IconButton>
                    </Dialog.Trigger>

                    <UpdateTransactionModal />
                  </Dialog.Root>
                </td>
                <td>
                  <Dialog.Root open={deleteTransactionModalIsOpen} onOpenChange={setDeleteTransactionModalIsOpen}>
                    <Dialog.Trigger asChild>
                      <IconButton variant="remove" onClick={() => setMyCurrentTransaction(item)}>
                        <Trash size={20} />
                      </IconButton>
                    </Dialog.Trigger>

                    <DeleteTransactionModal />
                  </Dialog.Root>
                </td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}