import { useEffect, useState } from "react";
import MovieMRCard from "./MovieMRCard";
import SkeletonMRCard from "./SkeletonMRCard";
import FilterMovies from "./FilterMovies";
import { Button } from "./ui/button";

export interface Movie {
  id: number;
  title_long: string;
  medium_cover_image: string;
  genres: string[];
  summary: string;
  url: string;
  rating: number;
}

function MovieRandomizer() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const getMovies = async (genre: string = "") => {
    try {
      setLoading(true);
      // Random page value from 1 - 200 using random()
      const randomPage = Math.floor(Math.random() * 200) + 1;

      const apiUrl = `https://yts.mx/api/v2/list_movies.json?quality=2160p&limit=1&genre=${genre}&page=${randomPage}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === "ok") {
        const randomMovieIndex = Math.floor(
          Math.random() * data.data.movies.length
        );
        setMovies([data.data.movies[randomMovieIndex]]);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies(selectedGenre);
  }, [selectedGenre]);

  const getRandomMovie = () => {
    getMovies(selectedGenre);
  };
  // Filter
  const handleFilterChange = (genre: string) => {
    setSelectedGenre(genre);
  };

  const handleClearFilter = () => {
    setSelectedGenre("");
  };

  const filteredMovies = movies
    ? movies.filter((movie) =>
        selectedGenre === "" ? true : movie.genres.includes(selectedGenre)
      )
    : [];

  return (
    <main className="max-w-4xl mx-auto px-5 my-6">
      <div className="flex flex-col md:grid md:grid-cols-12 gap-6">
        <div className="col-span-4 py-2 sticky top-14 z-50">
          <h1 className="text-sm mb-2">
            Welcome to movie randomizer! In this section, clicking the button{" "}
            <span>
              <Button size="sm" variant="link" className="p-0">
                Randomize
              </Button>
            </span>{" "}
            will give you a random movie to watch. Play along with filtering the
            genre.
          </h1>
          <p className="text-xs italic text-primary">
            Note: Movie quality is set to 2160p
          </p>
          <div className="flex md:block justify-between items-center gap-2 md:sticky md:top-14 md:z-50">
            <FilterMovies
              onFilterChange={handleFilterChange}
              onClearFilter={handleClearFilter}
            />
            <Button
              onClick={getRandomMovie}
              className="mt-2 md:h-8 h-9 md:py-3 py-2"
            >
              Randomize
            </Button>
          </div>
        </div>
        <div className="col-span-8">
          {loading && <SkeletonMRCard />}
          {!loading &&
            filteredMovies.map((movie) => (
              <MovieMRCard key={movie.id} movie={movie} />
            ))}
        </div>
      </div>
    </main>
  );
}

export default MovieRandomizer;
