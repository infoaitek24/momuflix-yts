// FilterMovies.tsx
import { useState, useEffect } from "react";

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
}

function FilterMovies({ onFilterChange }: FilterProps) {
  const [selectedGenres, setSelectedGenres] = useState<string>("");

  const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const genre = event.target.value;
    setSelectedGenres(genre);
  };

  useEffect(() => {
    onFilterChange(selectedGenres);
  }, [selectedGenres, onFilterChange]);

  return (
    <>
      <div className="sticky top-28 hidden md:block">
        <h2 className="font-semibold my-2 mt-7">Filter by Genre</h2>
        <div className="flex flex-col w-fit">
          {check_data.map((data) => (
            <label key={data.id} htmlFor={data.name} className="flex gap-2">
              <input
                type="radio"
                id={data.name}
                name="genre" // Add a common name for all radio buttons in the group
                value={data.name}
                checked={selectedGenres.includes(data.name)}
                onChange={handleGenreChange}
              />
              {data.name}
            </label>
          ))}
        </div>
      </div>
    </>
  );
}

export default FilterMovies;
