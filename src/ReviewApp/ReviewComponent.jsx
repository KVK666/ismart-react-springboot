import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteReviewByIdApi, postReviewApi, retrieveAllReviewsOfMovieApi, retrieveMovieByIdApi  } from '../api/MovieReviewApiService';
import { useEffect } from 'react';
import "./MovieReviewApp.css"
import ReviewsUnderMovieComponent from './ReviewsUnderMovieComponent';

export default function ReviewComponent() {

    const { id } = useParams();

    const { username } = useParams()

    const [reviews, setReviews] = useState([])

    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [description, setDescription] = useState('')
    const [director, setDirector] = useState('')
    const [language, setLanguage] = useState('')
    const [overAllRating, setRating] = useState('')
    const [poster, setPoster] = useState('')

    const [userReview, setUserReview] = useState('')
    const [movieRating, setMovieRating] = useState('')

    useEffect(
        () => retrieveMovies(), [id]
    )

    function retrieveMovies() {
        retrieveMovieByIdApi(id)
            .then(response => {
                setTitle(response.data.title)
                setYear(response.data.year)
                setDescription(response.data.description)
                setDirector(response.data.director)
                setLanguage(response.data.language)
                setRating(response.data.overAllRating)
                setPoster(response.data.poster)
            })
            .catch(error => console.log(error))




    }


    useEffect(
        () => {

            refreshReviews()
        }, []
    )

    function refreshReviews() {
        retrieveAllReviewsOfMovieApi(id)
            .then(response => {
                
                setReviews(response.data)
                refreshReviews()
                

            })
            .catch(error => console.log(error))
    }
   

    

    const movie = {
        id: id,
        title: title,
        year: year,
        description: description,
        director: director,
        language: language,
        overAllRating: overAllRating,
        poster:poster
    }
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const review = {
            username: username,
            rating: movieRating,
            review: userReview
        }
        postReviewApi(id, username, review)
            .then(response => {console.log(response)
            refreshReviews()})
            .catch(error => console.log(error));
    }

    


    return (
        <div >
            <div style={{ margin: "40px", textAlign: "left" }}>
                <div style={{ marginBottom: "5px" }}>
                    <h1 style={{ display: "inline-block" }}><strong>{movie.title}</strong></h1>
                    <h5 style={{ display: "inline-block", margin: "10px" }}>{movie.year}</h5>
                    <img src={movie.poster} alt={movie.title} style={{ position: "absolute", right: "0" }} />
                </div>
                <div style={{ lineHeight: "0.5" }}>
                    <p>Director: {movie.director}</p>
                    <p>Language: {movie.language}</p>
                    <p>Rating: {movie.overAllRating}</p>
                    <p><strong>Description</strong></p>
                    <p style={{whiteSpace: 'pre-line', wordBreak: 'break-word', lineHeight: '1.5',width:"40%"}}>{movie.description}</p>
                    
                </div>
                
            </div>
            

            <div style={{margin: "50px", textAlign:"left"}}>
                <form onSubmit={handleSubmit}>
                    <div >
                        <p><strong>Write your review here</strong></p>
                        <textarea
                            name='write review'
                            placeholder="write your review here"
                            value={userReview}
                            onChange={event => setUserReview(event.target.value)}
                        />
                    </div>
                    <div>
                        <select value={movieRating} onChange={event => setMovieRating(event.target.value)}>
                            <option value="">Select a rating</option>
                            <option value="1">1 star</option>
                            <option value="2">2 stars</option>
                            <option value="3">3 stars</option>
                            <option value="4">4 stars</option>
                            <option value="5">5 stars</option>
                        </select>
                    </div>
                    <button className="btn btn-success m-3" type="submit">Submit Review</button>
                </form>
            </div>
            {/* <ReviewsUnderMovieComponent/> */}

            <div style={{margin: "25px",textAlign:"left"}}>
            <h4 style={{textAlign:"center"}}>Reviews</h4>

            <div style={{textAlign:"center"}}>
            {reviews.length===0 && <p>Be the first one to review this movie</p>}
            </div>

            <ol >
            {reviews.map(review =>(
                <li key={review.id} className="card mb-3">
                    <p><img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="user" width="50px" height="50px"/>{review.userName}</p>
                    <p>Overall Rating: {review.rating} stars</p>
                    <p>Review: {review.review}</p>
                </li>
            ))}
            </ol>
        </div>


            

        </div>


    )
} 