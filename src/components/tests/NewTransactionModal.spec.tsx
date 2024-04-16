import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { faker } from "@faker-js/faker";

import { renderHeaderComponent, renderImgLogo } from "./Header.spec";
import {
  ITransactionContextType,
  TransactionsContext,
} from "../../contexts/TransactionContext";
import { Transactions } from "../../pages/Transactions";

// Mock the image file import
jest.mock("../../assets/logo.svg", () => "mocked-image-path");

// Mock axios
jest.mock("axios");

// Mock values input
const mockDescription = faker.commerce.productName();
const mockPrice = faker.number.int();
const mockCategory = faker.commerce.productMaterial();
const mockType = "outcome";

const createTransaction = jest.fn();
const closeNewTransactionModal = jest.fn();

const renderTransactionComponent = () => {
  return render(
    <TransactionsContext.Provider
      value={
        {
          transactions: [],
          createTransaction,
          closeNewTransactionModal,
        } as unknown as ITransactionContextType
      }
    >
      <Transactions />
    </TransactionsContext.Provider>
  );
};

describe("NewTransactionModal", () => {
  it("should render correctly component", () => {
    renderHeaderComponent();

    renderImgLogo();

    // Check if dialog is initially not rendered
    expect(screen.queryByText("Nova Transação")).not.toBeInTheDocument();

    const newTransactionButton = screen.getByText("Nova transação");

    fireEvent.click(newTransactionButton);

    /// Check if dialog is rendered after button click
    expect(screen.getByText("Nova Transação")).toBeInTheDocument();
  });

  it("should registers a transaction when form is submitted", async () => {
    renderTransactionComponent();

    // Check if dialog is initially not rendered
    expect(screen.queryByText("Nova Transação")).not.toBeInTheDocument();

    const newTransactionButton = screen.getByText("Nova transação");

    fireEvent.click(newTransactionButton);

    // Check button
    const registerButton = screen.getByText(/Cadastrar/i);

    expect(registerButton).toBeVisible();

    const descriptionInput = screen.getByPlaceholderText(/Descrição/i);
    const priceInput = screen.getByPlaceholderText(/Preço/i);
    const categoryInput = screen.getByPlaceholderText(/Categoria/i);
    const outcomeButton = screen.getByTestId("outcome");

    act(() => {
      fireEvent.change(descriptionInput, {
        target: { value: mockDescription },
      });
      fireEvent.change(priceInput, {
        target: { value: mockPrice },
      });
      fireEvent.change(categoryInput, {
        target: { value: mockCategory },
      });
      fireEvent.click(outcomeButton);
      fireEvent.click(registerButton);
    });

    expect(descriptionInput).toHaveValue(mockDescription);
    expect(priceInput).toHaveValue(mockPrice);
    expect(categoryInput).toHaveValue(mockCategory);

    await waitFor(() => {
      expect(createTransaction).toHaveBeenCalledTimes(1);
      expect(createTransaction).toHaveBeenCalledWith({
        description: mockDescription,
        price: mockPrice,
        category: mockCategory,
        type: mockType,
      });
    });
  });
});
