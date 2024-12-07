import { supabase } from "../supabase/config";
import React, { useEffect, useState } from "react";

const useFetchMain = () => {
  const [mainData, setMainData] = useState([]);

  useEffect(() => {
    const fetchMainData = async () => {
      const { data, error } = await supabase.from("main").select("*");

      if (data) {
        setMainData(data);
      } else {
        console.error(error);
      }
    };

    fetchMainData();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel("realtime:main") // Create a unique channel for this table
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "main" },
        (payload) => {
          console.log("Realtime event:", payload); // Log payload for debugging

          // Handle different event types
          switch (payload.eventType) {
            case "INSERT":
              fetchMainData();
              // setMainData((prev) => {
              //   console.log("Insert Payload:", payload.new);
              //   return [...prev, payload.new];
              // });
              break;
            case "UPDATE":
              fetchMainData();
              // setMainData((prev) => {
              //   console.log("Update Payload:", payload.new);
              //   return prev.map((item) =>
              //     item.id === payload.new.id
              //       ? { ...item, ...payload.new }
              //       : item
              //   );
              // });
              break;
            case "DELETE":
              fetchMainData();
              // setMainData((prev) => {
              //   console.log("Delete Payload:", payload.old);
              //   return prev.filter((item) => item.id !== payload.old.id); /
              // });
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

  return mainData; // Directly return mainData to use in your component
};

export default useFetchMain;
