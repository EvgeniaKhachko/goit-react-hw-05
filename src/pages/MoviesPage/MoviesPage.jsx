import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchMovies } from "../../services/Services.api";
import MovieList from "../../components/MovieList/MovieList";
import toast, { Toaster } from "react-hot-toast";
import { Field, Formik, Form } from "formik";
import s from "./MoviesPage.module.css";
const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      const searchResults = await getSearchMovies(query);
      setMovies(searchResults.results);
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (values, { resetForm }) => {
    const trimmedQuery = values.query.trim();
    setSearchParams({ query: trimmedQuery });
    resetForm();
  };

  return (
    <>
      <header className={s.searchBar}>
        <Toaster position="top-right" reverseOrder={false} />
        <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
          <Form className={s.form}>
            <Field
              name="query"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search for movies"
              className={s.input}
            />
            <button type="submit" className={s.button}>
              Search
            </button>
          </Form>
        </Formik>
      </header>
      <main>{movies.length > 0 && <MovieList movies={movies} />}</main>
    </>
  );
};
export default MoviesPage;
