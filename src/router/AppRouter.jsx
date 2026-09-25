import { Routes, Route } from "react-router-dom"
import FirstPage from "../pages/FirstPage"
import Register from "../pages/Register"
import Login from "../pages/Login"
import MainLayout from "../layouts/MainLayout"
import Dashboard from "../pages/Dashboard"
import History from "../pages/History"
import ProtectedRoute from "../controllers/ProtectedRoute"
import ForgotPassword from "../components/ForgotPassword"
import ResetPassword from "../components/ResetPassword"

const AppRouter = () => {
  return (
    <Routes>
        {/* Public */}
        <Route path="/" element={<FirstPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        {/* Protected Routes */}
        <Route element={
          <ProtectedRoute>
            <MainLayout/>
          </ProtectedRoute>
        }>
          <Route path="/home" element={<Dashboard/>}/>
          <Route path="/history" element={<History/>}/>
        </Route>
    </Routes>
  )
}

export default AppRouter
