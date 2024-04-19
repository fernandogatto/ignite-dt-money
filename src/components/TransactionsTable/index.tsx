import { Pencil, Trash } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

import { UpdateTransactionModal } from "../../components/UpdateTransactionModal";
import { DeleteTransactionModal } from "../../components/DeleteTransactionModal";

import {
  ITransaction,
  useTransaction,
} from "../../contexts/TransactionContext";

import {
  IconButton,
  PriceHighlight,
  TransactionsTableContainer,
} from "./styles";
import { dateFormatter, priceFormatter } from "../../utils/formatter";

export function TransactionsTable() {
  const {
    isLoading,
    hasError,
    transactions,
    updateTransactionModalIsOpen,
    setUpdateTransactionModalIsOpen,
    deleteTransactionModalIsOpen,
    setDeleteTransactionModalIsOpen,
    setMyCurrentTransaction,
  } = useTransaction();

  return (
    <TransactionsTableContainer>
      <tbody>
        {!isLoading &&
          !hasError &&
          transactions &&
          transactions.map((item: ITransaction) => (
            <tr key={item.id}>
              <td width="50%">{item.description}</td>
              <td>
                <PriceHighlight variant={item.type}>
                  {item.type === "outcome" && "- "}
                  {priceFormatter.format(item.price)}
                </PriceHighlight>
              </td>
              <td>{item.category}</td>
              <td>{dateFormatter.format(new Date(item.createdAt))}</td>
              <td>
                <Dialog.Root
                  open={updateTransactionModalIsOpen}
                  onOpenChange={setUpdateTransactionModalIsOpen}
                >
                  <Dialog.Trigger asChild>
                    <IconButton
                      variant="update"
                      onClick={() => setMyCurrentTransaction(item)}
                      data-testid="update"
                    >
                      <Pencil size={20} />
                    </IconButton>
                  </Dialog.Trigger>

                  <UpdateTransactionModal />
                </Dialog.Root>
              </td>
              <td>
                <Dialog.Root
                  open={deleteTransactionModalIsOpen}
                  onOpenChange={setDeleteTransactionModalIsOpen}
                >
                  <Dialog.Trigger asChild>
                    <IconButton
                      variant="remove"
                      onClick={() => setMyCurrentTransaction(item)}
                      data-testid="remove"
                    >
                      <Trash size={20} />
                    </IconButton>
                  </Dialog.Trigger>

                  <DeleteTransactionModal />
                </Dialog.Root>
              </td>
            </tr>
          ))}
      </tbody>
    </TransactionsTableContainer>
  );
}
