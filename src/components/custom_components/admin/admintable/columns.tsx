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
import { EditFormDialog } from "@/components/custom_components/EditForm";
import useFetchTeamPlayers from "@/custom-hooks/useFetchTeamPlayers";

export const columns = [
  {
    accessorKey: "id",
    header: () => <p className="flex items-center gap-1 cursor-pointer">ID</p>,
    cell: ({ row }) => <TableCell>{row.original.id}</TableCell>,
  },
  {
    accessorKey: "full_name",
    header: () => (
      <p className="flex items-center gap-1 cursor-pointer hover:text-red-500">
        Full Name/Team Name
      </p>
    ),
    cell: ({ row }) => {
      const { full_name, team_name } = row.original;

      if (!full_name && !team_name) {
        return <TableCell>-</TableCell>;
      }
      return (
        <TableCell>
          {[full_name, team_name].filter(Boolean).join(" || ")}
        </TableCell>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const { full_name, team_name } = row.original;

      const combinedValue = `${full_name} ${team_name}`.toLowerCase();

      const normalizedFilterValue = filterValue.trim().toLowerCase();

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
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [isEditOpen, setIsEditOpen] = useState(false);
      const [playerData, setPlayerData] = useState(null);
      const [teamName, setTeamName] = useState("");
      const { playersData } = useFetchTeamPlayers(teamName);

      const teamPlayers = playersData.map((player) => player.player_name);

      const handleSetTeamPlayers = (updatedPlayers) => {
        // Update playersData or send the changes to the server
        setPlayersData((prevData) =>
          prevData.map((player) =>
            player.team_name === teamName
              ? { ...player, players: updatedPlayers }
              : player
          )
        );
      };

      const handleOpenDialog = (teamOrPlayerData) => {
        setIsEditOpen(true);
        setPlayerData(teamOrPlayerData);

        if (teamOrPlayerData.team_name) {
          setTeamName(teamOrPlayerData.team_name);
        } else {
          setTeamName("");
        }
      };

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
                onClick={() => setIsDialogOpen(true)}
              >
                Manage Points
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => deleteConcern(player.id)}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleOpenDialog(player)}
              >
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isDialogOpen && (
            <PointsManager
              isOpen={isDialogOpen}
              setIsOpen={setIsDialogOpen}
              selectedId={player.id}
            />
          )}

          {isEditOpen && (
            <EditFormDialog
              isOpen={isEditOpen}
              setIsOpen={setIsEditOpen}
              isTeam={!!player.team_name}
              playerData={playerData}
              teamPlayers={teamPlayers}
              setTeamPlayers={handleSetTeamPlayers}
            />
          )}
        </>
      );
    },
  },
];
