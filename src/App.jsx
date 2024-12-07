import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import "./App.css";
import { supabase } from "./supabase/config";
import LoginForm from "./components/custom_components/admin/LoginForm";
import AdminTable from "./components/custom_components/admin/admintable/AdminTable";
import ProtectedRoute from "@/components/custom_components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<LoginForm />} />

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminTable />
            </ProtectedRoute>
          }
        />

        {/* Redirect to login by default */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
