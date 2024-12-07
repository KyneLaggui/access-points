import { supabase } from "../supabase/config";
import React, { useEffect, useState } from "react";

const useFetchMain = () => {
  const [mainData, setMainData] = useState([]);

  useEffect(() => {
    const fetchMainData = async () => {
      const { data, error } = await supabase.from("main").select("*");

      if (data) {
        setMainData(data); // Only set data once
      } else {
        console.error(error);
      }
    };

    // Fetch initial data
    fetchMainData();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel("realtime:main") // Create a unique channel for this table
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "main" },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setMainData((prev) => [...prev, payload.new]); // Add new row
              break;
            case "UPDATE":
              setMainData((prev) =>
                prev.map((item) =>
                  item.id === payload.new.id ? payload.new : item
                )
              ); // Update existing row
              break;
            case "DELETE":
              setMainData((prev) =>
                prev.filter((item) => item.id !== payload.old.id)
              ); // Remove deleted row
              break;
            default:
              break;
          }
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { mainData };
};

export default useFetchMain;
