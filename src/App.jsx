import { useEffect, useState } from "react";
import "./App.css";
import { CrudForm } from "./components/custom_components/CrudForm";
import useFetchMain from "./custom-hooks/useFetchMain";
import useFetchTeamPlayers from "./custom-hooks/useFetchTeamPlayers";
import { PointsManager } from "./components/custom_components/PointsManager";
import { HistoryList } from "./components/custom_components/HistoryList";
import AdminTable from "./components/custom_components/admin/admintable/AdminTable";

function App() {
  const [allData, setAllData] = useState([]);
  const [teamPlayers, setTeamPlayers] = useState([]);
  const { mainData } = useFetchMain();
  const { playersData } = useFetchTeamPlayers();

  useEffect(() => {
    if (mainData) {
      setAllData(mainData);
    }
  }, [mainData]);

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
      {allData.length > 0 &&
        allData.map((data) => (
          <div key={data.id}>
            <p className="text-red">{data.full_name}</p>
            <p className="text-red">{data.team_name}</p>
          </div>
        ))}

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
