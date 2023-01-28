import { useEffect, useState } from "react"
import { useNavigate, useParams} from "react-router-dom"
import { useAuth } from "../security/AuthContext"
import { deleteMovieByIdApi,retrieveAllMoviesApi } from "../api/MovieReviewApiService"

import "./MovieReviewApp.css"

function MovieListComponent(){
    const [movies, setMovies] = useState([])

    const [message, setMessage] = useState([])

    const navigate = useNavigate()

    

    const authContext = useAuth()

    const isAdmin=authContext.role==="Admin"

    const {userName}=useParams()

    useEffect(
        ()=>refreshMovies(), []
    )

    function refreshMovies(){
        retrieveAllMoviesApi()
        .then(response =>{ 
            // console.log(response)
            setMovies(response.data)
        })
        .catch(error => console.log(error))
        

    }

    function deleteMovie(id) {
        console.log("clicked "+ id)
        deleteMovieByIdApi(id)
        .then(
            () => {
                setMessage(`Delete of movie with  id ${id} successful`)
                refreshMovies()
            }


        )
        .catch(error => console.log(error))
        

    }

    function updateMovie(id) {
        console.log("clicked "+ id)
        navigate(`/movies/${id}`)
   
    }

    function addNewMovie(){
        navigate(`/movies/-1`)

    }

    function moviePreview(userName,id){
        navigate(`/movies/${userName}/reviews/${id}`)
    }

    

    return (
        <div className='Container'>
            <h1>Movies</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
            
                <table className='table'>
                    <thead>
                        <tr>
                            {/* <th>Movie Id</th> */}
                            <th>Movie Name</th>
                            <th>Released Year</th>
                            <th>Description</th>
                            <th>Director</th>
                            <th>Language</th>
                            <th>Rating</th>
                            {isAdmin && <th>Update</th>}
                            {isAdmin && <th>Delete</th>}
                        </tr>
                    </thead>
                    <tbody>{
                        movies.map(
                            movie => (
                            <tr key={movie.id}>
                                {/* <td>{movie.id}</td> */}
                                <td  className="title" onClick={()=>moviePreview(authContext.userName,movie.id)}>{movie.title}</td>
                                <td>{movie.year}</td>
                                <td>{movie.description}</td>
                                <td>{movie.director}</td>
                                <td>{movie.language}</td>
                                <td>{movie.overAllRating}</td>
                                {isAdmin && <td><button className="btn btn-success" onClick={() => updateMovie(movie.id)}>Update</button></td>}
                                {isAdmin &&<td><button className="btn btn-warning" onClick={() => deleteMovie(movie.id)}>Delete</button></td>}
                            </tr>

                            )
                        )
                        }
                        
                    </tbody>
                </table>
            </div>
            {isAdmin && <div className="btn btn-success m-5" onClick={addNewMovie}> Add New Movie</div>}
        </div>
    )
}

export default MovieListComponent