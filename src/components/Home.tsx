import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import MovieCard from "./MovieCard";
import Skeleton from "./SkeletonCard";
import FilterMovies from "./FilterMovies";

export interface Movie {
  id: number;
  title_long: string;
  medium_cover_image: string;
  genres: string[];
  summary: string;
  url: string;
  rating: number;
}

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const getMovies = async (
    query: string = "",
    page: number = 1,
    genre: string = ""
  ) => {
    try {
      setLoading(true);
      const apiUrl = query
        ? `https://yts.mx/api/v2/list_movies.json?quality=2160p&limit=30&query_term=${query}&page=${page}&genre=${genre}`
        : `https://yts.mx/api/v2/list_movies.json?quality=2160p&limit=30&page=${page}&genre=${genre}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === "ok") {
        setMovies(data.data.movies);
        setTotalPages(Math.ceil(data.data.movie_count / 30));
      } else {
        setMovies([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMovies([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies(searchQuery, 1, selectedGenre);
  }, [searchQuery, selectedGenre]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      getMovies(searchQuery);
    } else {
      getMovies();
    }
  }, [searchQuery]);

  useEffect(() => {
    updateVisiblePages();
  }, [currentPage, totalPages]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    getMovies(searchQuery, newPage, selectedGenre);
  };

  const updateVisiblePages = () => {
    const totalVisiblePages = 5;
    const halfVisiblePages = Math.floor(totalVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisiblePages);
    let endPage = Math.min(totalPages, startPage + totalVisiblePages - 1);

    if (endPage - startPage + 1 < totalVisiblePages) {
      startPage = Math.max(1, endPage - totalVisiblePages + 1);
    }

    setVisiblePages(
      Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
      )
    );
  };

  // Filter
  const handleFilterChange = (genre: string) => {
    setSelectedGenre(genre);
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
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
          <FilterMovies onFilterChange={handleFilterChange} />
        </div>
        <div className="col-span-8">
          {totalPages > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              visiblePages={visiblePages}
              onPageChange={handlePageChange}
            />
          )}
          {loading && <Skeleton />}
          {filteredMovies.length > 0 && !loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-3">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="col-span-4 sm:col-span-2">
              {searchQuery && <p>{searchQuery} is not Found</p>}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Home;
