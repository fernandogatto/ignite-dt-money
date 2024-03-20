import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useContext } from 'react';
import { TransactionsContext } from '../../contexts/TransactionContext';

import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';

const schema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
});

type UpdateTransactionFormInputs = z.infer<typeof schema>;

interface ITransaction {
  id: string;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  price: number;
  createdAt: Date;
}

interface IUpdateTransactionModalProps {
  transaction: ITransaction;
}

export function UpdateTransactionModal(data: IUpdateTransactionModalProps) {
  const transaction = data.transaction;

  const { updateTransaction } = useContext(TransactionsContext);

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, reset } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      description: transaction.description,
      price: transaction.price,
      category: transaction.category,
      type: transaction.type,
    }
  });

  async function handleUpdateTransaction(data: UpdateTransactionFormInputs) {
    console.log(data)
    const { description, price, category, type } = data;

    await updateTransaction({
      id: transaction.id,
      description,
      price,
      category,
      type,
      createdAt: transaction.createdAt,
    });

    // reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Atualizar Transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleUpdateTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register("description")}
          />

          <input
            type="number"
            placeholder="Preço"
            required
            {...register("price",{ valueAsNumber: true })}
          />

          <input
            type="text"
            placeholder="Categoria"
            required
            {...register("category")}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit"  disabled={isSubmitting}>
            Atualizar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}