import { supabase } from "../supabase/config";
import React, { useEffect, useState } from "react";

const useFetchMain = () => {
  const [mainData, setMainData] = useState([]);

  useEffect(() => {
    const fetchMainData = async () => {
      const { data, error } = await supabase.from("main").select("*");

      if (data) {
        const allMainData = data.map((main) => {
          return {
            ...main,
          };
        });

        setMainData(allMainData);
      } else {
        console.log(error);
      }
    };

    fetchMainData();
  }, []);

  return { mainData };
};

export default useFetchMain;
