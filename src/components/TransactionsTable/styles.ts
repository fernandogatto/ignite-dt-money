import styled from "styled-components";

export const TransactionsTableContainer = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme["gray-700"]};
    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`;

interface PriceHighlightProps {
  variant: "income" | "outcome";
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === "income"
      ? props.theme["green-300"]
      : props.theme["red-300"]};
`;

interface IconButtonProps {
  variant: "update" | "remove";
}

export const IconButton = styled.button<IconButtonProps>`
  padding: 0.375rem;
  background-color: transparent;
  border-radius: 6px;
  border: 2px solid
    ${(props) =>
      props.variant === "update"
        ? props.theme["green-500"]
        : props.theme["red-500"]};
  color: ${(props) =>
    props.variant === "update"
      ? props.theme["green-500"]
      : props.theme["red-500"]};
  cursor: pointer;
  transition: 0.3s ease all;

  &:hover {
    border: 2px solid
      ${(props) =>
        props.variant === "update"
          ? props.theme["green-700"]
          : props.theme["red-700"]};
    color: ${(props) =>
      props.variant === "update"
        ? props.theme["green-700"]
        : props.theme["red-700"]};
  }
`;
