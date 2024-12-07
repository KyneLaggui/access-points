import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import "./App.css";
import { supabase } from "./supabase/config";
import LoginForm from "./components/custom_components/admin/LoginForm";
import AdminTable from "./components/custom_components/admin/admintable/AdminTable";
import ProtectedRoute from "@/components/custom_components/ProtectedRoute";
import MainPage from "@/pages/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<MainPage />} />

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminTable />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
