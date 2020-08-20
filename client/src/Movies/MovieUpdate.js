import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const MovieUpdate = (props) => {
    const { update } = props
    const params = useParams()
    const { push } = useHistory()
    const initState = {
        id: "",
        title: "",
        director: "",
        metascore: 0,
        stars: []
    }
    const [newInfo, setNewInfo] = useState(initState)

    useEffect(() => {
        axios
      .get(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
          console.log(res.data)
          setNewInfo(res.data)
          console.log(newInfo)
      })
      .catch(err => console.log(err.response));
    },[params.id])

    const handleChanges = evt => {
        setNewInfo({
            ...newInfo,
            [evt.target.name]: evt.target.value
        })
    }
    const handleSubmit = evt => {
        evt.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${params.id}`, newInfo)
        .then(res => {
            console.log(res)
            update()
        })
        .catch(err => console.dir(err))
        push(`/movies/${params.id}`)
    }

    if(!newInfo) {
        return <h2>...LOADING INFO</h2>
    }
    return ( 
        <form onSubmit={handleSubmit}>
            <input type="text"
            name="title"
            value={newInfo.title}
            onChange={handleChanges}/>
            <input type="text"
            name="director"
            value={newInfo.director}
            onChange={handleChanges}/>
            <input type="number"
            name="metascore"
            value={newInfo.metascore}
            onChange={handleChanges}/>
            <button>Update Movie</button>
        </form>
     );
}
 
export default MovieUpdate;