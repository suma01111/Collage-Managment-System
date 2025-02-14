import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Login } from './pages/authentication/Login'
import { Signup } from './pages/authentication/Signup'
import { AppLayout } from './components/Layout/AppLayout'
import { ErrorPage } from './pages/ErrorPage'
import { DashboardLayout } from './components/Layout/DashboardLayout'  

// Student Dashboard imports
import { StudentDashboard } from './pages/dashboard/student/Dashboard'
import { StudentProfile } from './pages/dashboard/student/Profile'
import { StudentResults } from './pages/dashboard/student/Results'
import { StudentCourses } from './pages/dashboard/student/Courses'
import { StudentTimeTable } from './pages/dashboard/student/TimeTable'
import { StudentSetup } from './pages/dashboard/setuppage/StudentProfile'

// Faculty Dashboard imports
import { FacultyDashboard } from './pages/dashboard/faculty/Dashboard'
import { FacultyProfile } from './pages/dashboard/faculty/Profile'
import { ManageResults } from './pages/dashboard/faculty/ManageResults'
import { ManageCourses } from './pages/dashboard/faculty/ManageCourses'
import { ManageTimeTable } from './pages/dashboard/faculty/ManageTimeTable'

// Admin Dashboard imports
import { AdminDashboard } from './pages/dashboard/admin/Dashboard'
import { ManageFaculty } from './pages/dashboard/admin/ManageFaculty'
import { ManageStudents } from './pages/dashboard/admin/ManageStudents'
import { AdminManageCourses } from './pages/dashboard/admin/ManageCourses'
import { ManageUsers } from './pages/dashboard/admin/ManageUsers'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> }
    ]
  },
  {
    path: "/student",
    element: <DashboardLayout role="student" />,
    children: [
      { path: "dashboard", element: <StudentDashboard /> },
      { path: "profile", element: <StudentProfile /> },
      { path: "results", element: <StudentResults /> },
      { path: "courses", element: <StudentCourses /> },
      { path: "timetable", element: <StudentTimeTable /> },
      { path: "studentSetup", element: <StudentSetup /> }
    ]
  },
  {
    path: "/faculty",
    element: <DashboardLayout role="faculty" />,
    children: [
      { path: "dashboard", element: <FacultyDashboard /> },
      { path: "profile", element: <FacultyProfile /> },
      { path: "manage-results", element: <ManageResults /> },
      { path: "manage-courses", element: <ManageCourses /> },
      { path: "manage-timetable", element: <ManageTimeTable /> }
    ]
  },
  {
    path: "/admin",
    element: <DashboardLayout role="admin" />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "manage-faculty", element: <ManageFaculty /> },
      { path: "manage-students", element: <ManageStudents /> },
      { path: "manage-courses", element: <AdminManageCourses /> },
      { path: "manage-users", element: <ManageUsers /> }
    ]
  }
])

export const App = () => {
  return <RouterProvider router={router} />
}


