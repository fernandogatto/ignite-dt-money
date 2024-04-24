import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import {
  ITransactionContextType,
  TransactionsContext,
} from "../../contexts/TransactionContext";
import { TransactionsTable } from "../TransactionsTable";
import "@testing-library/jest-dom";
import { faker } from "@faker-js/faker";

// Mock axios
jest.mock("axios");

// Mock the context
const mockTransactions = [
  {
    id: faker.string.uuid(),
    description: faker.commerce.productName(),
    type: "income",
    category: faker.commerce.productMaterial(),
    price: faker.number.int(),
    createdAt: faker.date.past(),
  },
];
const mockSetMyCurrentTransaction = jest.fn();
const mockDeleteTransaction = jest.fn();
const mockCloseDeleteTransactionModal = jest.fn();

const renderTransactionComponent = () => {
  return render(
    <TransactionsContext.Provider
      value={
        {
          transactions: mockTransactions,
          currentTransaction: mockTransactions[0],
          setMyCurrentTransaction: mockSetMyCurrentTransaction,
          deleteTransaction: mockDeleteTransaction,
          closeDeleteTransactionModal: mockCloseDeleteTransactionModal,
        } as unknown as ITransactionContextType
      }
    >
      <TransactionsTable />
    </TransactionsContext.Provider>
  );
};

describe("DeleteTransactionModal", () => {
  it("should render icon button if transactions are loaded", async () => {
    renderTransactionComponent();

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Check if remove button is rendered after loading
    const removeTransactionButton = screen.getAllByTestId("remove")[0];
    expect(removeTransactionButton).toBeInTheDocument();
  });

  it("should open remove transaction dialog when the button is clicked", async () => {
    renderTransactionComponent();

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Check if dialog is initially not rendered
    expect(screen.queryByText("Excluir Transação")).not.toBeInTheDocument();

    // Check if remove button is rendered after loading
    const removeTransactionButton = screen.getAllByTestId("remove")[0];
    expect(removeTransactionButton).toBeInTheDocument();

    // Simulate click
    act(() => {
      fireEvent.click(removeTransactionButton);
    });

    // Check if dialog is rendered after button click
    expect(screen.getByText("Excluir Transação")).toBeInTheDocument();
  });

  it("should remove transaction when the removal confirmation button is clicked", async () => {
    renderTransactionComponent();

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Check if dialog is initially not rendered
    expect(screen.queryByText("Excluir Transação")).not.toBeInTheDocument();

    // Check if remove button is rendered after loading
    const removeTransactionButton = screen.getAllByTestId("remove")[0];
    expect(removeTransactionButton).toBeInTheDocument();

    // Simulate click
    act(() => {
      fireEvent.click(removeTransactionButton);
    });

    // Check if dialog is rendered after button click
    expect(screen.getByText("Excluir Transação")).toBeInTheDocument();

    // Check if confirm remove is rendered
    const removalConfirmationButton = screen.getByText("Excluir");
    expect(removalConfirmationButton).toBeInTheDocument();

    // Simulate click
    act(() => {
      fireEvent.click(removalConfirmationButton);
    });

    // Wait for delete to complete
    await waitFor(() => {
      expect(mockDeleteTransaction).toHaveBeenCalledWith(
        mockTransactions[0].id
      );
    });
  });
});
