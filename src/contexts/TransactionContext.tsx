import { ReactNode, createContext, useEffect, useState } from "react";

import TransactionsService from "../services/TransactionsService";

interface ITransaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  price: number;
  createdAt: string;
}

interface ICreateTransactionData {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

interface ITransactionContextType {
  isLoading: boolean;
  hasError: boolean;
  transactions: ITransaction[];
  getTransactions: (search?: string) => Promise<void>;
  createTransaction: (data: ICreateTransactionData) => Promise<void>;
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

  async function getTransactions(search?: string) {
    try {
      setIsLoading(true);
  
      const { data } = await TransactionsService.getTransactions(search);
  
      setIsLoading(false);
  
      setHasError(false);
  
      setTransactions(data);
    } catch (err) {
      console.error(err);

      setIsLoading(false);

      setHasError(true);
    }
  }

  async function createTransaction(data: ICreateTransactionData) {
    const { description, price, category, type } = data;

    const response = await TransactionsService.createNewTransacion({
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    });

    setTransactions(state => [response.data, ...state]);
  }

  return (
    <TransactionsContext.Provider value={{
      isLoading,
      hasError,
      transactions,
      getTransactions,
      createTransaction,
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}