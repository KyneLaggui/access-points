import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import useFetchSpecificArea from "@/custom-hooks/useFetchSpecificArea";

const SpecificArea = ({ team }) => {
  const contributors = team.contributors || [];
  const [isTeam, setIsTeam] = useState(false);

  const teamNames = contributors
    .filter((contributor) => contributor.team_name)
    .map((contributor) => contributor.team_name); // Get all team names

  const { playersData: teamPlayers } = useFetchSpecificArea(teamNames);

  useEffect(() => {
    const checkIfTeam = contributors.some(
      (contributor) => contributor.team_name
    );
    setIsTeam(checkIfTeam);
  }, [contributors]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`cursor-pointer px-6 py-4 text-white font-bold flex justify-between rounded-md ${team.color}`}
        >
          <div className="flex gap-4">
            <h1
              className={`font-protipoIcons uppercase text-3xl ${
                team.name === "Haas" ? "text-black" : "text-white"
              }`}
            >
              {team.rank}
            </h1>
            <div className="flex flex-col gap-2">
              <h1
                className={`font-formula1Bold uppercase text-3xl ${
                  team.name === "Haas" ? "text-black" : "text-white"
                }`}
              >
                {team.name || "none"}
              </h1>
              <span
                className={`font-protipoIcons font-normal ${
                  team.name === "Haas" ? "text-black" : "text-white"
                }`}
              >
                {isTeam
                  ? `Team Leader: ${team.highestContributor?.name || "none"}`
                  : `Top Contributor: ${
                      team.highestContributor?.name || "none"
                    }`}
              </span>
            </div>
          </div>
          <span
            className={`font-formula1Bold text-3xl ${
              team.name === "Haas" ? "text-black" : "text-white"
            }`}
          >
            {team.points}
          </span>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isTeam ? `Team: ${team.name}` : `Contributor: ${team.name}`}
          </DialogTitle>
          <DialogDescription>
            {isTeam
              ? "List of all contributors and players in this team."
              : "Details about the top contributor and their points."}
          </DialogDescription>
        </DialogHeader>
        <ul className="list-disc ml-4">
          {contributors.length > 0 ? (
            contributors.map((contributor, index) => (
              <div key={index}>
                {contributor.team_name ? (
                  // If it's a team, display the team name with points and then its players
                  <div>
                    <h3 className="font-bold mt-4">
                      {contributor.team_name} - {contributor.points || "0"}{" "}
                      points
                    </h3>
                    <ul className="ml-6">
                      {teamPlayers
                        .filter(
                          (player) => player.team_name === contributor.team_name
                        ) // Filter players by team
                        .map((player, playerIndex) => (
                          <li key={playerIndex}>
                            {player.player_name || "none"}
                          </li>
                        ))}
                    </ul>
                  </div>
                ) : (
                  // If it's a non-team contributor, just display their full name and points
                  <li key={index}>
                    {contributor.full_name || "none"} -{" "}
                    {contributor.points || "0"} points
                  </li>
                )}
              </div>
            ))
          ) : (
            <p>No contributors found.</p>
          )}

          {isTeam &&
            teamPlayers.length > 0 &&
            !contributors.some((contributor) => contributor.team_name) && (
              <>
                <h3 className="mt-4">Team Members:</h3>
                {teamPlayers.map((player, index) => (
                  <li key={index}>
                    {player.player_name || "none"} - {player.points || "0"}{" "}
                    points
                  </li>
                ))}
              </>
            )}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default SpecificArea;
