import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderHeaderComponent, renderImgLogo } from "./Header.spec";

// Mock the image file import
jest.mock("../../assets/logo.svg", () => "mocked-image-path");

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

    // Check inputs
    expect(screen.getByPlaceholderText(/Descrição/i)).toBeVisible();
    expect(screen.getByPlaceholderText(/Preço/i)).toBeVisible();
    expect(screen.getByPlaceholderText(/Categoria/i)).toBeVisible();
    expect(screen.getByText(/Entrada/i)).toBeVisible();
    expect(screen.getByText(/Saída/i)).toBeVisible();

    // Check button
    expect(screen.getByText(/Cadastrar/i)).toBeVisible();
  });
});
