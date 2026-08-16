import { Routes, Route } from "react-router"

import HomePage from "@/pages/HomePage"
import ThemePage from "@/pages/ThemePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import LandingPage from "./pages/LandingPage"
import PastSchedulesPage from "./pages/PastSchedulesPage"
import ClientsPage from "./pages/ClientsPage"
import AddClientPage from "./pages/AddClientPage"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/theme" element={<ThemePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/past-schedules" element={<PastSchedulesPage />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/add-client" element={<AddClientPage />} />
    </Routes>
  )
}