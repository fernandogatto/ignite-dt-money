import { useContext } from "react";
import { Trash } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";

import { TransactionsContext } from "../../contexts/TransactionContext";

import { IconButton, PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { DeleteTransactionModal } from "../../components/DeleteTransactionModal";

export function Transactions() {
  const { isLoading, hasError, transactions } = useContext(TransactionsContext);

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
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <IconButton variant="remove">
                        <Trash size={20} />
                      </IconButton>
                    </Dialog.Trigger>

                    <DeleteTransactionModal id={item.id} />
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