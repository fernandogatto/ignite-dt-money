import Api from './Api';

class TransactionsService {
  getTransactions() {
    return Api.get('/transactions');
  }
}

export default new TransactionsService();