// SearchBar.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="sticky top-16 z-50 rounded-lg w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-2 top-1.5 h-6 w-6" />
        <Input
          className="pl-9"
          type="text"
          placeholder="Search a movie by name..."
          name="search"
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>

      <div className="hidden md:block"></div>
    </div>
  );
}

export default SearchBar;
