import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFetchMain from "../../custom-hooks/useFetchMain";
import usePointsCrud from "../../custom-hooks/usePointsCrud";

export function PointsManager({ isOpen, setIsOpen, selectedId }) {
  const { mainData } = useFetchMain(); // Fetch full_name and team_name
  const { updatePoints } = usePointsCrud();
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [pointsInput, setPointsInput] = useState("");

  useEffect(() => {
    if (selectedId) {
      const entry = mainData.find((data) => data.id === parseInt(selectedId));
      setSelectedEntry(entry);
      // Safely handle the case where entry or entry.points is null or undefined
      setPointsInput(
        entry && entry.points != null ? entry.points.toString() : ""
      );
    }
  }, [selectedId, mainData]);

  const handlePointsChange = (e) => {
    const value = e.target.value;

    // Allow empty input or enforce a positive integer
    if (value === "" || /^\d+$/.test(value)) {
      setPointsInput(value);
    }
  };

  const handleSave = () => {
    if (selectedEntry && pointsInput !== "") {
      const newPoints = parseInt(pointsInput, 10); // Convert back to integer
      updatePoints(selectedEntry.id, newPoints - selectedEntry.points);
      setIsOpen(false); // Close dialog after saving
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Points for Player/Team</DialogTitle>
          <DialogDescription>
            Modify the points for the selected player or team. Ensure the points
            do not go negative.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {selectedEntry && (
            <>
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
                  type="text" // Set type to "text" to handle empty input
                  value={pointsInput}
                  onChange={handlePointsChange}
                />
              </div>

              {/* Save Button */}
              <DialogFooter>
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={pointsInput === ""}
                >
                  Save Points
                </Button>
              </DialogFooter>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
