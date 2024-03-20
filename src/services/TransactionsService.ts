import { api } from "../lib/axios";

interface ICreateTransactionData {
  description: string;
  price: number;
  category: string;
  type: string;
  createdAt: Date;
}

class TransactionsService {
  getTransactions(search?: string) {
    return api.get('transactions', {
      params: {
        // _sort: 'createdAt',
        // _order: 'desc',
        description: search,
      }
    });
  }

  createNewTransacion(data: ICreateTransactionData) {
    return api.post('transactions', data);
  }

  deleteTransaction(id: string) {
    return api.delete(`transactions/${id}`);
  }
}

export default new TransactionsService();