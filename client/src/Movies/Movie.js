import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, update }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const updateMovie = (evt) => {
    evt.preventDefault()
    push(`/update-movie/${params.id}`)
  }
  const deleteMovie = (evt) => {
    evt.preventDefault()
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then(res => {
      update()
      console.log(res)
    })
    .catch(err => console.log(err))
    push("/")
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={updateMovie}>Update Movie</button>
      <button onClick={deleteMovie}>Delete Movie</button>
    </div>
  );
}

export default Movie;
