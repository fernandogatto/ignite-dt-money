import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { MagnifyingGlass } from "phosphor-react";

import { useContext } from 'react';
import { TransactionsContext } from '../../contexts/TransactionContext';

import { SearchFormContainer } from "./styles";

const schema = z.object({
  search: z.string(),
});

type SearchFormInputs = z.infer<typeof schema>;

export function SearchForm() {
  const { getTransactions } = useContext(TransactionsContext);

  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    resolver: zodResolver(schema)
  });

  async function handleSearchTransaction(data: SearchFormInputs) {
    await new Promise(resolve => setTimeout(resolve, 2000));

    await getTransactions(data.search);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("search")}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}