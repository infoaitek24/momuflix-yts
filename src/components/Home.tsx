import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import MovieCard from "./MovieCard";
import Skeleton from "./SkeletonCard";

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

  const getMovies = async (query: string = "", page: number = 1) => {
    try {
      setLoading(true);
      const apiUrl = query
        ? `https://yts.mx/api/v2/list_movies.json?quality=2160p&limit=10&query_term=${query}&page=${page}`
        : `https://yts.mx/api/v2/list_movies.json?quality=2160p&limit=10&page=${page}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === "ok") {
        setMovies(data.data.movies);
        setTotalPages(Math.ceil(data.data.movie_count / 10));
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
    getMovies();
  }, []);

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
    getMovies(searchQuery, newPage);
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

  return (
    <main className="max-w-4xl mx-auto px-5 my-6">
      <div className="flex flex-col md:grid md:grid-cols-7 gap-6">
        <div className="col-span-3 py-2 sticky top-14 z-50">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </div>
        <div className="col-span-4">
          {totalPages > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              visiblePages={visiblePages}
              onPageChange={handlePageChange}
            />
          )}
          {loading && <Skeleton />}
          {movies?.length > 0 && !loading ? (
            <div className="grid grid-cols-4 gap-y-10 gap-3">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="col-span-4 sm:col-span-2">Not Found</div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Home;
