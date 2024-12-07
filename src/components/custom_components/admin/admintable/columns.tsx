import { ArrowDown, ArrowUp, MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/custom_components/admin/TableCell";
import { useState } from "react";
import { PointsManager } from "@/components/custom_components/PointsManager";

export const columns = [
  {
    accessorKey: "id",
    header: () => <p className="flex items-center gap-1 cursor-pointer">ID</p>,
    cell: ({ row }) => <TableCell>{row.original.id}</TableCell>,
  },
  {
    // You can use a single accessor here for the display, but not combine the keys
    accessorKey: "full_name", // Keep a single accessor key for table functionality
    header: () => (
      <p className="flex items-center gap-1 cursor-pointer hover:text-red-500">
        Full Name/Team Name
      </p>
    ),
    cell: ({ row }) => {
      const { full_name, team_name } = row.original; // Access full_name and team_name separately

      // If neither full_name nor team_name is available, return "-"
      if (!full_name && !team_name) {
        return <TableCell>-</TableCell>;
      }

      // Combine full_name and team_name for display
      return (
        <TableCell>
          {[full_name, team_name].filter(Boolean).join(" || ")}
        </TableCell>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const { full_name, team_name } = row.original; // Access full_name and team_name separately

      // Combine full_name and team_name for filtering
      const combinedValue = `${full_name} ${team_name}`.toLowerCase();

      // Normalize the filter value (trim spaces and make lowercase)
      const normalizedFilterValue = filterValue.trim().toLowerCase();

      // Check if the combined value includes the filter value
      return combinedValue.includes(normalizedFilterValue);
    },
  },

  {
    accessorKey: "section_team",
    header: () => (
      <p className="flex items-center gap-1 cursor-pointer hover:text-red-500">
        Section Team
      </p>
    ),
    cell: ({ row }) => {
      const sectionTeam = row.original.section_team;

      const formattedSectionTeam = sectionTeam
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return <TableCell>{formattedSectionTeam}</TableCell>;
    },
  },
  {
    accessorKey: "game",
    header: () => (
      <p className="flex items-center gap-1 cursor-pointer hover:text-red-500">
        Game
      </p>
    ),
    cell: ({ row }) => {
      const game = row.original.game;

      const formattedGame = game
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return <TableCell>{formattedGame}</TableCell>;
    },
  },
  {
    accessorKey: "points",
    header: () => (
      <p className="flex items-center gap-1 cursor-pointer hover:text-red-500">
        Points
      </p>
    ),
    cell: ({ row }) => <TableCell>{row.original.points}</TableCell>,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const player = row.original;
      const [isDialogOpen, setIsDialogOpen] = useState(false); // State for PointsManager
      const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for Dropdown

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>More Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setIsDialogOpen(true)} // Open PointsManager dialog
              >
                Manage Points
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => deleteConcern(concern.id)} // Delete action
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setIsDropdownOpen(true)} // Show more details (or another action)
              >
                More Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dialog integration */}
          {isDialogOpen && (
            <PointsManager
              isOpen={isDialogOpen}
              setIsOpen={setIsDialogOpen}
              selectedId={player.id}
            />
          )}
        </>
      );
    },
  },
];
