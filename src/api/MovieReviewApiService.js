import axios from "axios";

const apiClient=axios.create(
    {
        baseURL:'http://localhost:8765'
    }
)

export const retrieveAllMoviesApi
    = () => apiClient.get('/movie-service/api/v1/movies')


export const deleteMovieByIdApi
    = (id) => apiClient.delete(`/movie-service/api/v1/movies/removeMovie/${id}`)

export const retrieveMovieByIdApi
    = (id) => apiClient.get(`/movie-service/api/v1/movies/${id}`)

export const updateMovieApi
    = (id, movie) => apiClient.put(`/movie-service/api/v1/movies/updateMovie/${id}`,movie)

export const createMovieApi
    = (movie) => apiClient.post('/movie-service/api/v1/movies/addMovie',movie)

export const postReviewApi
    = (id,userName,review) => apiClient.post(`/movie-service/api/v1/movies/${id}/users/${userName}`,review)

export const retrieveAllReviewsOfMovieApi
    = (id) => apiClient.get(`/movie-service/api/v1/movies/${id}/reviews`)
