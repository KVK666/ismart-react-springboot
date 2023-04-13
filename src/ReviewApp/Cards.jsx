import React, {useEffect, useState} from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "./card.css"
import { Link } from "react-router-dom"
import { retrieveAllMoviesApi } from "../api/MovieReviewApiService"
import { useAuth } from "../security/AuthContext"

export default function Cards(){

    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const authContext = useAuth()
    const userName=authContext.username

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 0);
        refreshMovies();
    }, []);
    

    function refreshMovies() {
        retrieveAllMoviesApi()
            .then(response => {
                // console.log(response)
                setMovies(response.data)
            })
            .catch(error => console.log(error))


    }


    return(
        isLoading
        ?
        <div className="cards">
            <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
        </div>
        : movies.map(
            movie=>(
        <Link to={`/movies/${authContext.userName}/reviews/${movie.id}`} style={{textDecoration:"none", color:"white"}}>
            <div className="cards">
                <img className="cards__img" src={movie.poster} />
                <div className="cards__overlay">
                    <div className="card__title">{movie.title}</div>
                    <div className="card__runtime">
                        {movie.year}
                    </div>
                    <div className="card__description">{movie ? movie.description.slice(0,118)+"..." : ""}</div>
                </div>
            </div>
        </Link>
            )
        )
    )
}