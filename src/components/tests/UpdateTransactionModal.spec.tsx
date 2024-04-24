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

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock window.ResizeObserver
window.ResizeObserver = ResizeObserver;

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
const mockUpdateTransaction = jest.fn();
const mockCloseUpdateTransactionModal = jest.fn();

const mockDescription = "Change description";

const mockUpdateResponse = {
  ...mockTransactions[0],
  description: mockDescription,
};

const renderTransactionComponent = () => {
  return render(
    <TransactionsContext.Provider
      value={
        {
          transactions: mockTransactions,
          currentTransaction: mockTransactions[0],
          setMyCurrentTransaction: mockSetMyCurrentTransaction,
          updateTransaction: mockUpdateTransaction,
          closeUpdateTransactionModal: mockCloseUpdateTransactionModal,
        } as unknown as ITransactionContextType
      }
    >
      <TransactionsTable />
    </TransactionsContext.Provider>
  );
};

describe("UpdateTransactionModal", () => {
  it("should render icon button if transactions are loaded", async () => {
    renderTransactionComponent();

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Check if update button is rendered after loading
    const updateTransactionButton = screen.getAllByTestId("update")[0];
    expect(updateTransactionButton).toBeInTheDocument();
  });

  it("should open update transaction dialog when the button is clicked", async () => {
    renderTransactionComponent();

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Check if dialog is initially not rendered
    expect(screen.queryByText("Atualizar Transação")).not.toBeInTheDocument();

    // Check if update button is rendered after loading
    const updateTransactionButton = screen.getAllByTestId("update")[0];
    expect(updateTransactionButton).toBeInTheDocument();

    // Simulate click
    act(() => {
      fireEvent.click(updateTransactionButton);
    });

    // Check if dialog is rendered after button click
    expect(screen.getByText("Atualizar Transação")).toBeInTheDocument();
  });

  it("should update the transaction when the update button is clicked", async () => {
    renderTransactionComponent();

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Check if dialog is initially not rendered
    expect(screen.queryByText("Atualizar Transação")).not.toBeInTheDocument();

    // Check if update button is rendered after loading
    const updateTransactionButton = screen.getAllByTestId("update")[0];
    expect(updateTransactionButton).toBeInTheDocument();

    // Simulate click
    act(() => {
      fireEvent.click(updateTransactionButton);
    });

    // Check if dialog is rendered after button click
    expect(screen.getByText("Atualizar Transação")).toBeInTheDocument();

    // Check if button update is rendered
    const updateButton = screen.getByText("Atualizar");
    expect(updateButton).toBeInTheDocument();

    // Get input
    const descriptionInput = screen.getByPlaceholderText(/Descrição/i);

    // Simulate action
    act(() => {
      fireEvent.change(descriptionInput, {
        target: { value: mockDescription },
      });
      fireEvent.click(updateButton);
    });

    expect(descriptionInput).toHaveValue(mockDescription);

    // Wait for update to complete
    await waitFor(() => {
      expect(mockUpdateTransaction).toHaveBeenCalledTimes(1);
      expect(mockUpdateTransaction).toHaveBeenCalledWith(mockUpdateResponse);
    });
  });
});
