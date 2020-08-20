import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import MovieUpdate from "./Movies/MovieUpdate";
import MovieCreator from "./Movies/MovieCreator";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        setMovieList(res.data)
        setShouldUpdate(false)
      })
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [shouldUpdate]);

  return (
    <>
      <Link to="/add-movie">Add a Movie</Link>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} update={() => setShouldUpdate(true)}/>
      </Route>

      <Route path="/update-movie/:id">
        <MovieUpdate update={() => setShouldUpdate(true)}/>
      </Route>

      <Route path="/add-movie">
        <MovieCreator update={() => setShouldUpdate(true)} />
      </Route>
    </>
  );
};

export default App;
