import { ReactNode, createContext, useEffect, useState } from "react";

import TransactionsService from "../services/TransactionsService";

interface ITransaction {
  id: string;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  price: number;
  createdAt: Date;
}

interface ICreateTransactionData {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

interface IUpdateTransactionData {
  id: string;
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
  createdAt: Date;
}

interface ITransactionContextType {
  isLoading: boolean;
  hasError: boolean;
  transactions: ITransaction[];
  getTransactions: (search?: string) => Promise<void>;
  createTransaction: (data: ICreateTransactionData) => Promise<void>;
  updateTransaction: (data: IUpdateTransactionData) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
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

  async function updateTransaction(data: IUpdateTransactionData) {
    const { id, description, price, category, type, createdAt } = data;

    const response = await TransactionsService.updateTransaction({
      id,
      description,
      price,
      category,
      type,
      createdAt,
    });

    if (response) {
      setTransactions(prevTransactions =>
        prevTransactions.map(transaction =>
          transaction.id === id ? { ...transaction, ...data } : transaction
        )
      );
    }
  }

  async function deleteTransaction(id: string) {
    await TransactionsService.deleteTransaction(id);

    const filteredTransactions = transactions.filter(item => item.id !== id);

    setTransactions(filteredTransactions);
  }

  return (
    <TransactionsContext.Provider value={{
      isLoading,
      hasError,
      transactions,
      getTransactions,
      createTransaction,
      updateTransaction,
      deleteTransaction,
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}