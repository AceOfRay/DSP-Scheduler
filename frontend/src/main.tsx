import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"

import "./index.css"
import App from "./App"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "./components/theme-toggle"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider
        defaultTheme="system"
        storageKey="app-theme"
      >
        <App />
        <ThemeToggle />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)