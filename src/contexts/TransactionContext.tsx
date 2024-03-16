import { ReactNode, createContext, useEffect, useState } from "react";

import TransactionsService from "../services/TransactionsService";

interface ITransaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

interface ITransactionContextType {
  isLoading: boolean;
  hasError: boolean;
  transactions: ITransaction[];
}

interface ITransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as ITransactionContextType);

export function TransactionsProvider({ children }: ITransactionProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    getTransactions();
  }, [])

  async function getTransactions() {
    try {
      setIsLoading(true);
  
      const { data } = await TransactionsService.getTransactions();
  
      setIsLoading(false);
  
      setHasError(false);
  
      setTransactions(data);
    } catch (err) {
      console.error(err);

      setIsLoading(false);

      setHasError(true);
    }
  }

  return (
    <TransactionsContext.Provider value={{
      isLoading,
      hasError,
      transactions,
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}