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
import Ferrari from "@/assets/images/ferrari.png";
import AstonMartin from "@/assets/images/aston_martin.png";
import Mercedes from "@/assets/images/mercedes.png";
import Haas from "@/assets/images/haas.png";
import Mclaren from "@/assets/images/mclaren.png";
import Alpine from "@/assets/images/alpine.png";
import Redbull from "@/assets/images/redbull.png";

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

  // Dynamically set the image URL based on team name
  let imageUrl;
  switch (team.name) {
    case "Ferrari":
      imageUrl = Ferrari;
      break;
    case "Aston Martin":
      imageUrl = AstonMartin;
      break;
    case "Redbull":
      imageUrl = Redbull;
      break;
    case "Haas":
      imageUrl = Haas;
      break;
    case "Alpine":
      imageUrl = Alpine;
      break;
    case "McLaren":
      imageUrl = Mclaren;
      break;
    case "Mercedes":
      imageUrl = Mercedes;
      break;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`cursor-pointer relative text-white font-bold overflow-hidden flex gap-3 rounded-md ${team.color}`}
        >
          <img
            src={imageUrl}
            alt={team.name}
            className={`absolute top-[-200px] object-cover opacity-5 ${
              team.name === "Haas" ? "filter invert" : ""
            }`}
          />

          <div className="bg-black isolate bg-opacity-20 flex items-center justify-center w-20 ">
            <h1
              className={`font-protipoIcons uppercase text-5xl ${
                team.name === "Haas" ? "text-black" : "text-white"
              }`}
            >
              {team.rank}
            </h1>
          </div>
          <div className="flex isolate justify-between w-full px-6 py-4 ">
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
                  ? `Team Name: ${team.highestContributor?.name || "None"}`
                  : `Top Contributor: ${
                      team.highestContributor?.name || "None"
                    }`}
              </span>
            </div>
            <span
              className={`font-formula1Bold text-3xl ${
                team.name === "Haas" ? "text-black" : "text-white"
              }`}
            >
              {team.points}
            </span>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="min-h-[200px]">
        <DialogHeader>
          <DialogTitle className="font-formula1Bold uppercase">
            {isTeam ? `${team.name}` : `${team.name}`}
          </DialogTitle>
          <DialogDescription>
            {isTeam
              ? "List of all contributors and players in this team."
              : "Details about the contributors and their points."}
          </DialogDescription>
        </DialogHeader>
        <div className="px-4 py-2 ">
          {isTeam ? (
            ""
          ) : (
            <div className="flex justify-between mb-3 font-bold">
              <h1>Name</h1>
              <h1>Points</h1>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {contributors.length > 0 ? (
              contributors.map((contributor, index) => (
                <div key={index}>
                  {contributor.team_name ? (
                    <div>
                      <div className="font-bold flex justify-between">
                        <h1>{contributor.team_name}</h1>
                        <h1>{contributor.points || "0"} points </h1>
                      </div>
                      <ul className="ml-6 list-disc">
                        {teamPlayers
                          .filter(
                            (player) =>
                              player.team_name === contributor.team_name
                          )
                          .map((player, playerIndex) => (
                            <li key={playerIndex}>
                              {player.player_name || "none"}
                            </li>
                          ))}
                      </ul>
                    </div>
                  ) : (
                    <div key={index} className="flex justify-between ">
                      <div>{contributor.full_name || "none"}</div>
                      <div>{contributor.points || "0"} points</div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No contributors found.</p>
            )}
          </div>

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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpecificArea;
