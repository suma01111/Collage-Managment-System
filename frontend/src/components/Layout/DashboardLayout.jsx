import { Outlet } from "react-router-dom"
import { Navbar } from "../Navbar"
import { Sidebar } from "../Sidebar"

export const DashboardLayout = ({ role }) => {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar role={role} />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
} 