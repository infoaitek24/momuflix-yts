// SearchBar.tsx
import React from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="sticky top-16 z-50 rounded-lg w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Input
        type="text"
        placeholder="Search a movie by name..."
        name="search"
        value={searchQuery}
        onChange={onSearchChange}
      />
      <div className="hidden md:block"></div>
    </div>
  );
}

export default SearchBar;
