import React, { useState, useEffect } from "react";
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
import useFetchMain from "../../custom-hooks/useFetchMain";
import usePointsCrud from "../../custom-hooks/usePointsCrud";

export function PointsManager() {
  const { mainData } = useFetchMain(); // Fetch full_name and team_name
  const { updatePoints } = usePointsCrud();
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [pointsInput, setPointsInput] = useState(0);

  const handleSelectChange = (id) => {
    const entry = mainData.find((data) => data.id === parseInt(id));
    setSelectedEntry(entry);
    setPointsInput(entry ? entry.points : 0);
  };

  const handlePointsChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value) || 0); // Prevent negative values
    setPointsInput(value);
  };

  const handleSave = () => {
    if (selectedEntry) {
      updatePoints(selectedEntry.id, pointsInput - selectedEntry.points);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Manage Points</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Points for Player/Team</DialogTitle>
          <DialogDescription>
            Modify the points for the selected player or team. Ensure the points
            do not go negative.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Select Team or Player */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="team_player" className="text-right">
              Select Team or Player
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange(value)}
              id="team_player"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Team or Player" />
              </SelectTrigger>
              <SelectContent>
                {mainData.map((entry) => (
                  <SelectItem key={entry.id} value={entry.id}>
                    {entry.team_name || entry.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Display Current Points */}
          {selectedEntry && (
            <div>
              <p>
                Current Points for{" "}
                {selectedEntry.team_name || selectedEntry.full_name}:{" "}
                {selectedEntry.points}
              </p>

              {/* Points Input */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="points_input" className="text-right">
                  Enter New Points
                </Label>
                <Input
                  id="points_input"
                  type="number"
                  value={pointsInput}
                  onChange={handlePointsChange}
                  min="0"
                />
              </div>

              {/* Save Button */}
              <DialogFooter>
                <Button type="button" onClick={handleSave}>
                  Save Points
                </Button>
              </DialogFooter>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
