import { useContext } from "react";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";

import { TransactionsContext } from "../../contexts/TransactionContext";

import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

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
                    {item.price}
                  </PriceHighlight>
                </td>
                <td>{item.category}</td>
                <td>{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}