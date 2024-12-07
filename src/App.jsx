import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import "./App.css";
import AdminTable from "./components/custom_components/admin/admintable/AdminTable";
import ProtectedRoute from "@/components/custom_components/ProtectedRoute";
import MainPage from "@/pages/MainPage";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
    </ThemeProvider>
  );
}

export default App;
