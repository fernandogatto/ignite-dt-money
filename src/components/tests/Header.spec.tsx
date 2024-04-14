import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "../Header";

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

export const renderHeaderComponent = () => {
  render(<Header />);
};

export const renderImgLogo = () => {
  const imgLogo = screen.getByAltText("DT Money");

  expect(imgLogo).toBeInTheDocument();
  expect(imgLogo).toHaveAttribute("src", "mocked-image-path");
};

describe("Header", () => {
  it("should render image logo with correct alt text", () => {
    renderHeaderComponent();

    renderImgLogo();
  });

  it("should render button of new transaction", () => {
    renderHeaderComponent();

    const newTransactionButton = screen.getByText("Nova transação");

    expect(newTransactionButton).toBeInTheDocument();
  });

  it("should open new transaction dialog when the button is clicked", () => {
    renderHeaderComponent();

    // Check if dialog is initially not rendered
    expect(screen.queryByText("Nova Transação")).toBeNull();

    const newTransactionButton = screen.getByText("Nova transação");

    fireEvent.click(newTransactionButton);

    /// Check if dialog is rendered after button click
    expect(screen.getByText("Nova transação")).toBeInTheDocument();
  });
});
