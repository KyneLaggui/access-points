import React, { useEffect, useState } from "react";
import useFetchMain from "../custom-hooks/useFetchMain";

const Teams = () => {
  // List of teams with the correct background colors for display
  const teams = [
    { name: "Ferrari", value: "ferrari", color: "bg-red-500" },
    { name: "Aston Martin", value: "aston_martin", color: "bg-green-500" },
    { name: "Redbull", value: "redbull", color: "bg-blue-500" },
    { name: "Alpine", value: "alpine", color: "bg-blue-700" },
    { name: "Haas", value: "haas", color: "bg-gray-500" },
    { name: "Mercedes", value: "mercedes", color: "bg-gray-900" },
    { name: "McLaren", value: "mclaren", color: "bg-orange-500" },
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

    setTeamPoints(initialTeamPoints); // Set the calculated team points
    setHighestContributors(initialTeamPoints); // Set the highest contributor data
  }, [mainData, selectedGame]);

  return (
    <div className="p-4">
      {/* Game Selection Buttons */}
      <div className="flex space-x-4 mb-4">
        {games.map((game) => (
          <button
            key={game}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setSelectedGame(game)}
          >
            {gameNames[game]} {/* Display the user-friendly name */}
          </button>
        ))}
      </div>

      {/* Display all teams' points and highest contributors */}
      <div className="grid gap-4">
        {teamPoints.map((team, index) => (
          <div
            key={index}
            className={`p-4 text-white font-bold rounded-md ${team.color}`}
          >
            <div className="flex justify-between items-center">
              <span>{team.name}</span>
              <span>{team.points} Points</span>
            </div>
            <div className="mt-2">
              <span>Highest Contributor: {team.highestContributor.name}</span>
              <span> - {team.highestContributor.points} Points</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
