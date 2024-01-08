import { useState, useEffect } from "react";
import { Button } from "./ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const check_data = [
  { id: 1, name: "Action" },
  { id: 2, name: "Drama" },
  { id: 3, name: "Horror" },
  { id: 4, name: "Crime" },
  { id: 5, name: "Mystery" },
  { id: 6, name: "Thriller" },
  { id: 7, name: "Adventure" },
  { id: 8, name: "Animation" },
  { id: 9, name: "Family" },
  { id: 10, name: "Fantasy" },
];

interface FilterProps {
  onFilterChange: (selectedGenres: string) => void;
  onClearFilter: () => void;
}

function FilterMovies({ onFilterChange, onClearFilter }: FilterProps) {
  const [selectedGenres, setSelectedGenres] = useState<string>("");

  const handleGenreChange = (event: string) => {
    setSelectedGenres(event);
    if (event === "All") {
      clearFilter();
    }
  };

  const clearFilter = () => {
    setSelectedGenres("");
    onClearFilter();
  };

  useEffect(() => {
    onFilterChange(selectedGenres);
  }, [selectedGenres, onFilterChange]);

  return (
    <>
      <div className="sticky top-28 hidden md:block">
        <h2 className="font-semibold my-2 mt-7 hidden md:block">
          Filter by Genre
        </h2>
        <div className="flex flex-col w-fit bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Select
            defaultValue={selectedGenres}
            onValueChange={(value) => handleGenreChange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {check_data.map((data) => (
                <SelectItem key={data.id} value={data.name}>
                  {data.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={clearFilter}
          variant="destructive"
          className="mt-5 hidden md:block"
          size="sm"
        >
          Clear Filter
        </Button>
      </div>
    </>
  );
}

export default FilterMovies;
