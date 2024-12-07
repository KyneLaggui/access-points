import React, { useEffect, useState } from "react";
import useFetchMain from "../custom-hooks/useFetchMain";

const Teams = () => {
  // List of teams with the correct background colors for display
  const teams = [
    { name: "Ferrari", value: "ferrari", color: "bg-[#ff7900]" },
    { name: "Aston Martin", value: "aston_martin", color: "bg-[#006833]" },
    { name: "Redbull", value: "redbull", color: "bg-[#e11b4c]" },
    { name: "Alpine", value: "alpine", color: "bg-[#006fb9]" },
    { name: "Haas", value: "haas", color: "bg-[#ffffff]" },
    { name: "Mercedes", value: "mercedes", color: "bg-[#3b3b3b]" },
    { name: "McLaren", value: "mclaren", color: "bg-[#ffbc1d]" },
  ];

  const { mainData } = useFetchMain(); // Fetch data using custom hook

  const [teamPoints, setTeamPoints] = useState([]);
  const [selectedGame, setSelectedGame] = useState("all"); // Default to 'all'
  const [highestContributors, setHighestContributors] = useState([]);

  // Games list to be used for the filter buttons
  const games = [
    "all",
    "flip_cup",
    "dress_to_impress",
    "chinese_garter",
    "block_blast",
  ];

  // Mapping to display readable names for games
  const gameNames = {
    all: "All",
    flip_cup: "Flip Cup",
    dress_to_impress: "Dress to Impress",
    chinese_garter: "Chinese Garter",
    block_blast: "Block Blast",
  };

  // Calculate the points for each team and the highest contributor
  useEffect(() => {
    // Filter data based on selected game
    const filteredData =
      selectedGame === "all"
        ? mainData
        : mainData.filter((entry) => entry.game === selectedGame);

    // Initialize points for each team
    const initialTeamPoints = teams.map((team) => ({
      name: team.name,
      value: team.value,
      color: team.color,
      points: 0,
      highestContributor: {
        name: null,
        points: 0,
      },
    }));

    // Group points by dbName and track the highest contributor for each team
    filteredData.forEach((entry) => {
      const teamIndex = initialTeamPoints.findIndex(
        (team) => team.value === entry.section_team
      );

      if (teamIndex !== -1) {
        initialTeamPoints[teamIndex].points += entry.points;

        // Check if the current entry has higher points than the current highest contributor
        const currentContributor = entry.full_name || entry.team_name;
        const currentPoints = entry.points;

        if (
          currentPoints > initialTeamPoints[teamIndex].highestContributor.points
        ) {
          initialTeamPoints[teamIndex].highestContributor = {
            name: currentContributor,
            points: currentPoints,
          };
        }
      }
    });

    // Sort the teams by points in descending order to determine ranking
    initialTeamPoints.sort((a, b) => b.points - a.points);

    setTeamPoints(initialTeamPoints); // Set the calculated team points
    setHighestContributors(initialTeamPoints); // Set the highest contributor data
  }, [mainData, selectedGame]);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4 overflow-x-scroll sm:overflow-x-hidden">
        {games.map((game) => (
          <button
            key={game}
            className={`px-4 py-2 text-white relative group text-nowrap  ${
              selectedGame === game ? "text-yellow-400 " : ""
            }`}
            onClick={() => setSelectedGame(game)}
          >
            {gameNames[game]}
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                selectedGame === game ? "scale-x-100" : ""
              }`}
            />
          </button>
        ))}
      </div>

      {/* Display all teams' points and highest contributors with ranking */}
      <div className="grid gap-4">
        {teamPoints.map((team, index) => (
          <div
            key={index}
            className={`p-4 text-white font-bold rounded-md ${team.color}`}
          >
            <div className="flex justify-between items-center">
              <h1
                className={`font-formula1Bold uppercase text-3xl ${
                  team.name === "Haas" ? "text-black" : "text-white"
                }`}
              >
                {index + 1}. {team.name}
              </h1>
              <span className="font-formula1Bold text-3xl">{team.points}</span>
            </div>
            <div className="mt-2">
              <span
                className={` ${
                  team.name === "Haas" ? "text-black" : "text-white"
                }`}
              >
                Highest Contributor: {team.highestContributor.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
