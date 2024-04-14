import { render, screen } from "@testing-library/react";
import { SearchForm } from "../SearchForm";
import "@testing-library/jest-dom";

describe("SearchForm", () => {
  it("should render correctly", () => {
    render(<SearchForm />);

    expect(screen.getByText("Buscar")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Busque por transações/i)).toBeVisible();
  });
});
