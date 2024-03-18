import { api } from "../lib/axios";

class TransactionsService {
  getTransactions(search?: string) {
    return api.get('transactions', {
      params: {
        description: search,
      }
    });
  }
}

export default new TransactionsService();