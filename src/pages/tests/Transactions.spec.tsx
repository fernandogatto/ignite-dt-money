import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { faker } from "@faker-js/faker";

import { Transactions } from "../Transactions";
import { TransactionsProvider } from "../../contexts/TransactionContext";
import { renderImgLogo } from "../../components/tests/Header.spec";

// Mock the image file import
jest.mock("../../assets/logo.svg", () => "mocked-image-path");

const description = faker.internet.userName();

// Mock the transaction context value
jest.mock("../../contexts/TransactionContext", () => ({
  ...jest.requireActual("../../contexts/TransactionContext"),
  useTransaction: jest.fn(() => ({
    setMyCurrentTransaction: jest.fn(),
    transactions: [
      {
        id: faker.string.uuid(),
        description: description,
        type: "income",
        category: faker.internet.userName(),
        price: faker.number.int(),
        createdAt: faker.date.past(),
      },
    ],
  })),
}));

const renderComponent = () => {
  render(
    <TransactionsProvider>
      <Transactions />
    </TransactionsProvider>
  );
};

describe("Transactions", () => {
  it("should render all transactions", () => {
    renderComponent();

    renderImgLogo();

    expect(screen.getByText(description)).toBeInTheDocument();
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

    const updateTransactionButton = screen.getByTestId("update");

    fireEvent.click(updateTransactionButton);

    /// Check if dialog is rendered after button click
    expect(screen.getByText("Atualizar Transação")).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("should open remove transaction dialog when the button is clicked", () => {
    renderComponent();

    // Check if dialog is initially not rendered
    expect(screen.queryByText("Excluir Transação")).not.toBeInTheDocument();

    const removeTransactionButton = screen.getByTestId("remove");

    fireEvent.click(removeTransactionButton);

    /// Check if dialog is rendered after button click
    expect(screen.getByText("Excluir Transação")).toBeInTheDocument();
  });
});
