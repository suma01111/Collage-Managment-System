import { Outlet } from "react-router-dom"
import { Navbar } from "../Navbar.jsx"

export const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
} 