import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CircleAlert,
  CircleCheckBig,
  HandHelping,
  Lightbulb,
  ScanEye,
  TriangleAlert,
  VenetianMask,
  X,
} from "lucide-react";
import DataTableFacetedFilter from "@/components/custom_components/admin/admintable/data-table-faceted-filter";
import { CrudForm } from "../../CrudForm";

function DataTableToolbar({ table, allData }) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const sectionTeam = [
    {
      value: "ferrari",
      label: "Ferrari",
      icon: TriangleAlert,
    },
    {
      value: "aston_martin",
      label: "Aston Martin",
      icon: TriangleAlert,
    },
    {
      value: "redbull",
      label: "Red Bull",
      icon: TriangleAlert,
    },
    {
      value: "alpine",
      label: "Alpine",
      icon: TriangleAlert,
    },
    {
      value: "haas",
      label: "Haas",
      icon: TriangleAlert,
    },
    {
      value: "mercedes",
      label: "Mercedes",
      icon: TriangleAlert,
    },
    {
      value: "mclaren",
      label: "McLaren",
      icon: TriangleAlert,
    },
  ];

  const gameSpecific = [
    {
      value: "dress_to_impress",
      label: "Dress to Impress",
      icon: VenetianMask,
    },
    {
      value: "block_blast",
      label: "Block Blast",
      icon: VenetianMask,
    },
    {
      value: "chinese_garter",
      label: "Chinese Garter",
      icon: VenetianMask,
    },
    {
      value: "flip_cup",
      label: "Flip Cup",
      icon: VenetianMask,
    },
  ];

  return (
    <div className="flex flex-col items-start lg:flex-row lg:justify-between gap-2 w-full">
      <div className="flex flex-col sm:flex-row gap-2 w-full flex-wrap">
        <Input
          placeholder="Search for Name..."
          value={table.getColumn("full_name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("full_name")?.setFilterValue(event.target.value)
          }
          className="min-w-[200px]"
        />

        <DataTableFacetedFilter
          column={table.getColumn("section_team")}
          title="Section Team"
          options={sectionTeam}
        />

        <DataTableFacetedFilter
          column={table.getColumn("game")}
          title="Game"
          options={gameSpecific}
        />

        <CrudForm />

        <div className="flex items-center">
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DataTableToolbar;
