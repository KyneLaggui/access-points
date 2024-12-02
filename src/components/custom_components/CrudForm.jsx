import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import useCreateMain from "../../custom-hooks/useCreateMain";

export function CrudForm() {
  const [formState, setFormState] = useState({
    full_name: "",
    game: "",
    section_team: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (key, value) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form State:", formState);
    // Call your custom hook or API here
    useCreateMain(formState);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Player</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adding Player</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Full Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="full_name" className="text-right">
              Full Name
            </Label>
            <Input
              id="full_name"
              className="col-span-3"
              value={formState.full_name}
              onChange={handleInputChange}
            />
          </div>

          {/* Game Selection */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="game" className="text-right">
              Games
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("game", value)}
              id="game"
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

          {/* Section Team Selection */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="section_team" className="text-right">
              Section Team
            </Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("section_team", value)
              }
              id="section_team"
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
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
