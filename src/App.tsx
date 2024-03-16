import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { TransactionsProvider } from "./contexts/TransactionContext";
import { Transactions } from "./pages/Transactions";
import { GlobalStyle } from "./styles/global";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  )
}
