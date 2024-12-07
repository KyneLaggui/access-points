import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import useCreateMain from "@/custom-hooks/useCreateMain";
import useCreateTeam from "@/custom-hooks/useCreateTeam";

export const EditFormDialog = ({
  isOpen,
  setIsOpen,
  isTeam,
  playerData,
  teamPlayers,
  setTeamPlayers,
}) => {
  const [editedName, setEditedName] = useState("");
  const [editedTeamName, setEditedTeamName] = useState("");
  const [editedSectionTeam, setEditedSectionTeam] = useState("");
  const [editedGame, setEditedGame] = useState("");
  const [localTeamPlayers, setLocalTeamPlayers] = useState(teamPlayers || []);

  const createMain = useCreateMain; // Custom hook for players
  const createTeam = useCreateTeam; // Custom hook for teams

  useEffect(() => {
    if (playerData) {
      setEditedName(playerData.full_name || "");
      setEditedTeamName(playerData.team_name || "");
      setEditedSectionTeam(playerData.section_team || "");
      setEditedGame(playerData.game || "");
    }
    setLocalTeamPlayers(teamPlayers); // Sync local players
  }, [playerData, teamPlayers]);

  const handleSave = async () => {
    if (isTeam) {
      const teamData = {
        id: playerData.id,
        team_name: editedTeamName,
        section_team: editedSectionTeam,
        game: editedGame,
      };
      await createTeam(teamData, localTeamPlayers); // Save team data
    } else {
      const playerData = {
        id: playerData.id,
        full_name: editedName,
        section_team: editedSectionTeam,
        game: editedGame,
      };
      await createMain(playerData); // Save player data
    }

    setIsOpen(false); // Close dialog after saving
  };

  const handlePlayerChange = (index, value) => {
    const updatedPlayers = [...localTeamPlayers];
    updatedPlayers[index] = value;
    setLocalTeamPlayers(updatedPlayers);
  };

  const removePlayer = (index) => {
    const updatedPlayers = localTeamPlayers.filter((_, i) => i !== index);
    setLocalTeamPlayers(updatedPlayers);
  };

  const addPlayer = () => {
    setLocalTeamPlayers([...localTeamPlayers, ""]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isTeam ? "Edit Team" : "Edit Player"}</DialogTitle>
          <DialogDescription>
            Modify the details of the selected {isTeam ? "team" : "player"}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isTeam ? (
            <>
              <Label htmlFor="team_name">Team Name</Label>
              <Input
                id="team_name"
                value={editedTeamName}
                onChange={(e) => setEditedTeamName(e.target.value)}
              />
              <Label htmlFor="team_players">Players</Label>
              {localTeamPlayers.map((player, index) => (
                <div key={index} className="flex justify-between items-center">
                  <Input
                    value={player}
                    onChange={(e) => handlePlayerChange(index, e.target.value)}
                  />
                  <Button
                    variant="destructive"
                    onClick={() => removePlayer(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addPlayer}>
                Add Player
              </Button>
            </>
          ) : (
            <>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </>
          )}

          <Label htmlFor="section_team">Section Team</Label>
          <Select
            value={editedSectionTeam}
            onValueChange={setEditedSectionTeam}
          >
            <SelectTrigger>
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

          <Label htmlFor="game">Game</Label>
          <Select value={editedGame} onValueChange={setEditedGame}>
            <SelectTrigger>
              <SelectValue placeholder="Select Game" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flip_cup">Flip Cup</SelectItem>
              <SelectItem value="chinese_garter">Chinese Garter</SelectItem>
              {isTeam ? null : (
                <>
                  <SelectItem value="dress_to_impress">
                    Dress to Impress
                  </SelectItem>
                  <SelectItem value="block_blast">Block Blast</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
