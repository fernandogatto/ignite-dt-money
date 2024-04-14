import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "../Header";
import "@testing-library/jest-dom";

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

describe("Header", () => {
  it("should render image logo with correct alt text", () => {
    render(<Header />);

    const imgLogo = screen.getByAltText("DT Money");

    expect(imgLogo).toBeInTheDocument();
    expect(imgLogo).toHaveAttribute("src", "mocked-image-path");
  });

  it("should render button of new transaction", () => {
    render(<Header />);

    const newTransactionButton = screen.getByText("Nova transação");

    expect(newTransactionButton).toBeInTheDocument();
  });

  it("should open new transaction dialog when the button is clicked", () => {
    render(<Header />);

    // Check if dialog is initially not rendered
    expect(screen.queryByText("Nova Transação")).toBeNull();

    const newTransactionButton = screen.getByText("Nova transação");

    fireEvent.click(newTransactionButton);

    /// Check if dialog is rendered after button click
    expect(screen.getByText("Nova transação")).toBeInTheDocument();
  });
});
