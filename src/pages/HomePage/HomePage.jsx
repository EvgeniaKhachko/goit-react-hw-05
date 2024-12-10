import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/Services.api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";
const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const trendingMovies = await getTrendingMovies();
      setMovies(trendingMovies.results);
    };

    fetchMovies();
  }, []);

  return (
    <div className={s.list}>
      <h1 className={s.title}>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
