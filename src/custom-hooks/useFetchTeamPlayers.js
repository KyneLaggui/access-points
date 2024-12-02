import { useState, useEffect } from "react";
import { supabase } from "../supabase/config";

const useFetchTeamPlayers = () => {
  const [playersData, setPlayersData] = useState([]);

  useEffect(() => {
    const fetchPlayersData = async () => {
      const { data, error } = await supabase.from("team_players").select("*");
      if (data) {
        setPlayersData(data);
      } else {
        console.error(error);
      }
    };

    fetchPlayersData();
  }, []);

  return { playersData };
};

export default useFetchTeamPlayers;
