import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import useCreateMain from "../../custom-hooks/useCreateMain";
import useCreateTeam from "../../custom-hooks/useCreateTeam";

const playerSchema = z.object({
  full_name: z.string().min(1, "Full Name is required"),
  game: z.string().min(1, "Game is required"),
  section_team: z.string().min(1, "Section Team is required"),
});

const teamSchema = z.object({
  team_name: z.string().min(1, "Team Name is required"),
  section_team: z.string().min(1, "Section Team is required"),
  game: z.string().min(1, "Game is required"),
  players: z
    .array(z.string().min(1, "Player name cannot be empty"))
    .min(2, "At least 2 players are required"),
});

export function CrudForm() {
  const [formState, setFormState] = useState({
    full_name: "",
    game: "",
    section_team: "",
  });

  const [teamData, setTeamData] = useState({
    team_name: "",
    section_team: "",
    game: "",
  });

  const [teamPlayers, setTeamPlayers] = useState(["", ""]); // Default minimum of 2 players
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const resetFields = () => {
    setFormState({ full_name: "", game: "", section_team: "" });
    setTeamData({ team_name: "", section_team: "", game: "" });
    setTeamPlayers(["", ""]);
    setErrors({});
  };

  // Handle input changes
  const handleInputChange = (e, stateUpdater) => {
    const { id, value } = e.target;
    stateUpdater((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (key, value, stateUpdater) => {
    stateUpdater((prev) => ({ ...prev, [key]: value }));
  };

  const handlePlayerChange = (index, value) => {
    const updatedPlayers = [...teamPlayers];
    updatedPlayers[index] = value;
    setTeamPlayers(updatedPlayers);
  };

  // Add and remove player fields
  const addPlayerField = () => setTeamPlayers([...teamPlayers, ""]);
  const removePlayerField = (index) => {
    if (teamPlayers.length > 2) {
      setTeamPlayers((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Submit functions
  const handlePlayerSubmit = async () => {
    const validation = playerSchema.safeParse(formState);

    if (!validation.success) {
      const newErrors = validation.error.format();
      setErrors({
        full_name: newErrors.full_name?._errors?.[0],
        game: newErrors.game?._errors?.[0],
        section_team: newErrors.section_team?._errors?.[0],
      });
      return;
    }

    try {
      // Call your custom hook here and wait for it to finish
      await useCreateMain(formState);
      resetFields();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error submitting player:", error);
      // Optionally handle error state here
    }
  };

  const handleTeamSubmit = async () => {
    const filteredPlayers = teamPlayers.filter(
      (player) => player.trim() !== ""
    );
    const validation = teamSchema.safeParse({
      ...teamData,
      players: filteredPlayers,
    });

    if (!validation.success) {
      const newErrors = validation.error.format();
      setErrors({
        team_name: newErrors.team_name?._errors?.[0],
        section_team: newErrors.section_team?._errors?.[0],
        game: newErrors.game?._errors?.[0],
        players: newErrors.players?._errors?.[0],
      });
      return;
    }

    try {
      await useCreateTeam(teamData, filteredPlayers);
      resetFields();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error submitting team:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Register</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="sr-only">
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="player">
          <TabsList>
            <TabsTrigger value="player">Player</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          {/* Player Tab */}
          <TabsContent value="player">
            <div className="grid gap-4">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formState.full_name}
                onChange={(e) => handleInputChange(e, setFormState)}
              />
              {errors.full_name && (
                <p className="text-red-500 text-sm">{errors.full_name}</p>
              )}

              <Label htmlFor="section_team">Section Team</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("section_team", value, setFormState)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectContent>
                    <SelectItem value="ferrari">Ferrari</SelectItem>
                    <SelectItem value="aston_martin">Aston Martin</SelectItem>
                    <SelectItem value="redbull">RedBull</SelectItem>
                    <SelectItem value="alpine">Alpine</SelectItem>
                    <SelectItem value="haas">Haas</SelectItem>
                    <SelectItem value="mercedes">Mercedes</SelectItem>
                    <SelectItem value="mclaren">McLaren</SelectItem>
                  </SelectContent>
                </SelectContent>
              </Select>
              {errors.section_team && (
                <p className="text-red-500 text-sm">{errors.section_team}</p>
              )}

              {/* Game Select */}
              <Label htmlFor="game">Game</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("game", value, setFormState)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Game" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dress_to_impress">
                    Dress to Impress
                  </SelectItem>

                  <SelectItem value="chinese_garter">Chinese Garter</SelectItem>

                  <SelectItem value="block_blast">Block Blast</SelectItem>
                </SelectContent>
              </Select>
              {errors.game && (
                <p className="text-red-500 text-sm">{errors.game}</p>
              )}
              {/* Section Team Select */}
            </div>
            <Button onClick={handlePlayerSubmit}>Save changes</Button>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team">
            <div className="grid gap-4">
              {/* Team Name */}
              <Label htmlFor="team_name">Team Name</Label>
              <Input
                id="team_name"
                value={teamData.team_name}
                onChange={(e) => handleInputChange(e, setTeamData)}
              />
              {/* Section Team */}
              <Label htmlFor="section_team">Section Team</Label>
              {errors.team_name && (
                <p className="text-red-500 text-sm">{errors.team_name}</p>
              )}
              <Select
                onValueChange={(value) =>
                  handleSelectChange("section_team", value, setTeamData)
                }
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
              {errors.section_team && (
                <p className="text-red-500 text-sm">{errors.section_team}</p>
              )}
              {/* Game */}
              <Label htmlFor="game">Game</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("game", value, setTeamData)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Game" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flip_cup">Flip Cup</SelectItem>

                  <SelectItem value="chinese_garter">Chinese Garter</SelectItem>
                </SelectContent>
              </Select>
              {errors.game && (
                <p className="text-red-500 text-sm">{errors.game}</p>
              )}

              {/* Players */}
              <Label>Players</Label>
              {teamPlayers.map((player, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Input
                    id={`player_${index}`}
                    placeholder={`Player ${index + 1}`}
                    value={player}
                    onChange={(e) => handlePlayerChange(index, e.target.value)}
                  />
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => removePlayerField(index)}
                    disabled={teamPlayers.length <= 2}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              {errors.players && (
                <p className="text-red-500 text-sm">{errors.players}</p>
              )}
              <Button type="button" onClick={addPlayerField}>
                Add Player
              </Button>
            </div>

            <Button onClick={handleTeamSubmit}>Register Team</Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
