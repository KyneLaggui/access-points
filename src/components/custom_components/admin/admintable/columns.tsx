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
        Full Name
      </p>
    ),
    cell: ({ row }) => <TableCell>{row.original.full_name}</TableCell>,
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
  // {
  //   accessorKey: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const concern = row.original;
  //     const [isOpen, setIsOpen] = useState(false);
  //     const [isResolved, setIsResolved] = useState(concern.is_resolved);
  //     const [isDialogOpen, setIsDialogOpen] = useState(false);

  //     const handleToggleStatus = async () => {
  //       const newStatus = !isResolved;
  //       const updatedStatus = await updateConcernStatus(concern.id, newStatus);
  //       setIsResolved(updatedStatus);
  //     };

  //     return (
  //       <>
  //         <DropdownMenu>
  //           <DropdownMenuTrigger>
  //             <MoreHorizontalIcon className="h-4 w-4" />
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent>
  //             <DropdownMenuLabel>More Actions</DropdownMenuLabel>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem
  //               className="cursor-pointer"
  //               onClick={() => setIsDialogOpen(true)} // Trigger the AlertDialog
  //             >
  //               {isResolved ? "Mark as Unresolved" : "Mark as Resolved"}
  //             </DropdownMenuItem>
  //             <DropdownMenuItem
  //               className="cursor-pointer"
  //               onClick={() => deleteConcern(concern.id)} // Trigger the AlertDialog
  //             >
  //               Delete
  //             </DropdownMenuItem>
  //             <DropdownMenuItem
  //               className="cursor-pointer"
  //               onClick={() => setIsOpen(true)}
  //             >
  //               More Details
  //             </DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>

  //         <ConfirmationDialog
  //           isOpen={isDialogOpen}
  //           onOpenChange={setIsDialogOpen}
  //           isResolved={isResolved}
  //           onConfirm={handleToggleStatus}
  //         />

  //         <Concerns isOpen={isOpen} setIsOpen={setIsOpen} concern={concern} />
  //       </>
  //     );
  //   },
  // },
];
