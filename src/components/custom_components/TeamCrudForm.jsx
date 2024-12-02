import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCreateTeam from "../../custom-hooks/useCreateTeam";

export function TeamCrudForm() {
  const [teamData, setTeamData] = useState({
    team_name: "",
    section_team: "",
    game: "",
  });
  const [teamPlayers, setTeamPlayers] = useState([""]);

  const handleTeamDataChange = (e) => {
    const { id, value } = e.target;
    setTeamData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (key, value) => {
    setTeamData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePlayerChange = (index, value) => {
    const updatedPlayers = [...teamPlayers];
    updatedPlayers[index] = value;
    setTeamPlayers(updatedPlayers);
  };

  const addPlayerField = () => setTeamPlayers([...teamPlayers, ""]);

  const handleSubmit = () => {
    useCreateTeam(teamData, teamPlayers);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Register Team</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register Team</DialogTitle>
          <DialogDescription>
            Fill out the form to register a team and its players.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Team Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="team_name" className="text-right">
              Team Name
            </Label>
            <Input
              id="team_name"
              className="col-span-3"
              value={teamData.team_name}
              onChange={handleTeamDataChange}
            />
          </div>

          {/* Section Team */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="section_team" className="text-right">
              Section Team
            </Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("section_team", value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ferrari">Ferrari</SelectItem>
                <SelectItem value="aston_martin">Aston Martin</SelectItem>
                <SelectItem value="redbull">RedBull</SelectItem>
                <SelectItem value="alpine">Alpine</SelectItem>
                <SelectItem value="haas">Haas</SelectItem>
                <SelectItem value="mercedes">Mercedes</SelectItem>
                <SelectItem value="mclaren">McLaren</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Game */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="game" className="text-right">
              Game
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("game", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Game" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dress_to_impress">
                  Dress to Impress
                </SelectItem>
                <SelectItem value="arm_wrestling">Arm Wrestling</SelectItem>
                <SelectItem value="chinese_garter">Chinese Garter</SelectItem>
                <SelectItem value="doctor_quack_quack">
                  Doctor Quack-Quack
                </SelectItem>
                <SelectItem value="flip_cup">Flip Cup</SelectItem>
                <SelectItem value="skribble">Skribble.io</SelectItem>
                <SelectItem value="block_blast">Block Blast</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Players */}
          <div>
            <Label>Players</Label>
            {teamPlayers.map((player, index) => (
              <div key={index} className="grid grid-cols-4 items-center gap-4">
                <Input
                  id={`player_${index}`}
                  className="col-span-3"
                  placeholder={`Player ${index + 1}`}
                  value={player}
                  onChange={(e) => handlePlayerChange(index, e.target.value)}
                />
              </div>
            ))}
            <Button type="button" onClick={addPlayerField}>
              Add Player
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            Register Team
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
