import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import { getMovieDetailsPage } from "../../services/Services.api";
import s from "./MovieDetailsPage.module.css";
const defaultImg =
  "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = useRef(location.state ?? "/");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const movieData = await getMovieDetailsPage(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchDetails();
  }, [movieId]);

  if (!movie) return null;
  console.log("movie start");

  console.log(movie);
  console.log("movie end");
  return (
    <div>
      <Link className={s.go_back} to={backLink.current}>
        Go back
      </Link>
      <div className={s.container}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : defaultImg
          }
          alt="poster"
          width={250}
        />
        <div className={s.fcontent}>
          <h1 className={s.title}>{movie.title}</h1>

          <p className={s.text}>
            <span className={s.descrHeadline}>Release Date:</span>
            {movie.release_date}
          </p>
          <p className={s.text}>
            <span className={s.descrHeadline}>User Score:</span>{" "}
            {movie.popularity}
          </p>
          <p className={s.text}>
            <span className={s.descrHeadline}>Status: </span>
            {movie.status}
          </p>
          <p className={s.text}>
            <span className={s.descrHeadline}>Overview:</span> {movie.overview}
          </p>
          {movie.genres && (
            <>
              <h3 className={s.gen}>Genres:</h3>
              <ul className={s.genres}>
                {movie.genres.map(({ id, name }) => (
                  <li key={id}>
                    <p>{name}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <h3 className={s.title}>Additional information</h3>
      <nav className={s.nav}>
        <Link className={s.item} to="cast">
          Cast
        </Link>
        <Link className={s.item} to="reviews">
          Reviews
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
