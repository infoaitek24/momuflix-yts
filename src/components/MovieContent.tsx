// MovieContent.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { Link } from "react-router-dom";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

interface Movie {
  id: number;
  title_long: string;
  medium_cover_image: string;
  genres: string[];
  description_full: string;
  url: string;
  rating: number;
}

function MovieContent() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
        );
        const data = await response.json();
        if (data.status === "ok") {
          setMovie(data.data.movie);
        } else {
          setMovie(null);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setMovie(null);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <div className="max-w-5xl px-3 mx-auto my-20">
        <div className="md:flex-row flex-col flex items-center">
          <Skeleton className="w-[14.5rem] h-[22.5rem]"></Skeleton>
          <div>
            <CardHeader>
              <Skeleton className="h-5 w-20"></Skeleton>
              <Skeleton className="h-[10rem] w-[27rem] md:w-[45rem]"></Skeleton>
            </CardHeader>
            <CardContent className="flex flex-col justify-center gap-2">
              <Skeleton className="h-5 w-[4rem]"></Skeleton>
              <Skeleton className="h-5 w-[20rem]"></Skeleton>
            </CardContent>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl px-3 mx-auto my-20">
      <div className="md:flex-row flex-col flex items-center">
        <img
          className="rounded-md"
          src={movie.medium_cover_image}
          alt={movie.title_long}
        />
        <div>
          <CardHeader>
            <CardTitle>{movie.title_long}</CardTitle>
            {movie.description_full ? (
              <CardDescription>{movie.description_full}</CardDescription>
            ) : (
              <CardDescription>No Description for this movie</CardDescription>
            )}
          </CardHeader>
          <CardContent className="flex flex-col justify-center">
            <p>Rating: {movie.rating}</p>
            <p>
              Movie URL:{" "}
              <Link to={movie.url} target="_blank">
                <Button variant="link">{movie.url}</Button>
              </Link>
            </p>
          </CardContent>
        </div>
      </div>
    </div>
  );
}

export default MovieContent;
