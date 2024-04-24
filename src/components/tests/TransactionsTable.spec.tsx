import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { faker } from "@faker-js/faker";

import {
  ITransactionContextType,
  TransactionsContext,
} from "../../contexts/TransactionContext";
import { TransactionsTable } from "../TransactionsTable";

// Mock the image file import
jest.mock("../../assets/logo.svg", () => "mocked-image-path");

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock window.ResizeObserver
window.ResizeObserver = ResizeObserver;

// Mock the context
const mockDescription = faker.commerce.productName();
const mockTransactions = [
  {
    id: faker.string.uuid(),
    description: mockDescription,
    type: "income",
    category: faker.commerce.productMaterial(),
    price: faker.number.int(),
    createdAt: faker.date.past(),
  },
];
const mockSetMyCurrentTransaction = jest.fn();

const renderComponent = () => {
  return render(
    <TransactionsContext.Provider
      value={
        {
          transactions: mockTransactions,
          currentTransaction: mockTransactions[0],
          setMyCurrentTransaction: mockSetMyCurrentTransaction,
        } as unknown as ITransactionContextType
      }
    >
      <TransactionsTable />
    </TransactionsContext.Provider>
  );
};

describe("Transactions", () => {
  it("should render all transactions", () => {
    renderComponent();

    expect(screen.getByText(mockDescription)).toBeInTheDocument();
  });

  it("should render update transaction button", () => {
    renderComponent();

    expect(screen.getByTestId("update")).toBeInTheDocument();
  });

  it("should render remove transaction button", () => {
    renderComponent();

    expect(screen.getByTestId("remove")).toBeInTheDocument();
  });

  it("should open update transaction dialog when the button is clicked", () => {
    renderComponent();

    // Check if dialog is initially not rendered
    expect(screen.queryByText("Atualizar Transação")).not.toBeInTheDocument();

    const updateTransactionButton = screen.getAllByTestId("update")[0];

    fireEvent.click(updateTransactionButton);

    /// Check if dialog is rendered after button click
    expect(screen.getByText("Atualizar Transação")).toBeInTheDocument();
    expect(screen.getByText(mockDescription)).toBeInTheDocument();
  });

  it("should open remove transaction dialog when the button is clicked", () => {
    renderComponent();

    // Check if dialog is initially not rendered
    expect(screen.queryByText("Excluir Transação")).not.toBeInTheDocument();

    const removeTransactionButton = screen.getAllByTestId("remove")[0];

    // Simulate click
    fireEvent.click(removeTransactionButton);

    // Check if dialog is rendered after button click
    expect(screen.getByText("Excluir Transação")).toBeInTheDocument();
  });
});
