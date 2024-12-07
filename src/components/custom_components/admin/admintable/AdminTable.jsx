import { useEffect } from "react";
import { columns } from "./columns";
import DataTable from "./data-table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { supabase } from "@/supabase/config";

export default function AdminTable() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/"); // Redirect to login after logout
    } else {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <DataTable columns={columns} />
    </div>
  );
}
