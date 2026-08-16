import { Routes, Route } from "react-router"

import HomePage from "@/pages/HomePage"
import ThemePage from "@/pages/ThemePage"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/theme" element={<ThemePage />} />
    </Routes>
  )
}