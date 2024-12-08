import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import useFetchTeamPlayers from "@/custom-hooks/useFetchTeamPlayers";

const SpecificArea = ({ team }) => {
  const contributors = team.contributors || [];
  const [isTeam, setIsTeam] = useState(false);

  // Use the first `team_name` in contributors, or pass null if not found
  const teamName = contributors.find(
    (contributor) => contributor.team_name
  )?.team_name;
  const { playersData: teamPlayers } = useFetchTeamPlayers(teamName);

  useEffect(() => {
    // Determine if the contributors array represents a team
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
              <li key={index}>
                {contributor.full_name || contributor.team_name || "none"} -{" "}
                {contributor.points} points
              </li>
            ))
          ) : (
            <p>No contributors found.</p>
          )}
          {isTeam && teamPlayers.length > 0 && (
            <>
              <h1></h1>
              <h3 className="mt-4">Team Members:</h3>
              {teamPlayers.map((player, index) => (
                <li key={index}>{player.player_name || "none"}</li>
              ))}
            </>
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default SpecificArea;
