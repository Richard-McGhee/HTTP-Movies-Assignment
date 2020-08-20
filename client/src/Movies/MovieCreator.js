import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const MovieCreator = ({ update }) => {
    const history = useHistory()
    const initState = {
        id: "",
        title: "",
        director: "",
        metascore: 0,
        stars: []
    }
    const [newMovie, setNewMovie] = useState(initState)

    const handleChanges = evt => {
        setNewMovie({
            ...newMovie,
            [evt.target.name]: evt.target.value,
        })
    }
    const handleStars = evt => {
        const newStar = evt.target.value
        setNewMovie({
            ...newMovie,
            stars: [...newMovie.stars, newStar]
        })
    }
    const handleSubmit = evt => {
        evt.preventDefault()
        axios.post("http://localhost:5000/api/movies/", newMovie)
        .then(res => {
            console.log(res)
            update()
        })
        .catch(err => console.log(err))
        history.push("/")
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <input type="text"
            name="title"
            value={newMovie.title}
            placeholder="Title"
            onChange={handleChanges}/>
            <input type="text"
            name="director"
            placeholder="Director"
            value={newMovie.director}
            onChange={handleChanges}/>
            <input type="number"
            name="metascore"
            value={newMovie.metascore}
            onChange={handleChanges}/>
            <input type="text"
            name="stars"
            placeholder="Name of Star"
            onChange={handleStars}/>
            <button>Add your Movie</button>
        </form>
     );
}
 
export default MovieCreator;