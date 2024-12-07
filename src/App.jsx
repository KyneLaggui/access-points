import { useEffect, useState } from "react";
import "./App.css";
import { CrudForm } from "./components/custom_components/CrudForm";
import useFetchMain from "./custom-hooks/useFetchMain";
import useFetchTeamPlayers from "./custom-hooks/useFetchTeamPlayers";
import { PointsManager } from "./components/custom_components/PointsManager";
import { HistoryList } from "./components/custom_components/HistoryList";
import AdminTable from "./components/custom_components/admin/admintable/AdminTable";

function App() {
  const [teamPlayers, setTeamPlayers] = useState([]);
  const { playersData } = useFetchTeamPlayers();

  useEffect(() => {
    if (playersData) {
      setTeamPlayers(playersData);
    }
  }, [playersData]);

  return (
    <div>
      <CrudForm />
      <PointsManager />
      <HistoryList />
      <AdminTable />

      {teamPlayers.length > 0 &&
        teamPlayers.map((player, index) => (
          <div key={index}>
            <p className="text-blue">Team Name: {player.team_name}</p>
            <p className="text-blue">Player Name: {player.player_name}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
