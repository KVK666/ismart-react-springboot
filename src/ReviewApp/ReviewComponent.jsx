import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteReviewByIdApi, postReviewApi, retrieveAllReviewsOfMovieApi, retrieveMovieByIdApi } from '../api/MovieReviewApiService';
import { useEffect } from 'react';
import "./MovieReviewApp.css"

import StarRatingComponent from 'react-star-rating-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


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
        poster: poster
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const review = {
            username: username,
            rating: movieRating,
            review: userReview
        }
        postReviewApi(id, username, review)
            .then(response => {
                console.log(response)
                refreshReviews()
            })
            .catch(error => console.log(error));
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = Math.round(totalRating / reviews.length);





    return (
        <div >
            <div className='movie-container'>
                <div className="movie-card">
                    <div>
                        <h1><strong>{movie.title}</strong></h1>
                        <h5>{movie.year}</h5>
                        <img src={movie.poster} alt={movie.title} />
                    </div>
                    <div>
                        <p>Director: {movie.director}</p>
                        <p>Language: {movie.language}</p>
                        <p>Rating: <StarRatingComponent
                                        name="rating"
                                        value={averageRating}
                                        starCount={5}
                                        editing={false}
                                    /></p>
                        
                        
                        <span><strong>Description</strong></span>
                        <p>{movie.description}</p>


                    </div>
                </div>



                <div class="container">
                    <form onSubmit={handleSubmit}>
                        <div class="form-group">
                            <label for="reviewText">Write your review here:</label>
                            <textarea
                                class="form-control"
                                id="reviewText"
                                placeholder="Write your review here"
                                value={userReview}
                                onChange={event => setUserReview(event.target.value)}
                            />
                        </div>
                        <div class="form-group">
                            <label for="ratingSelect">Select a rating:</label>
                            <select
                                class="form-control"
                                id="ratingSelect"
                                value={movieRating}
                                onChange={event => setMovieRating(event.target.value)}
                            >
                                <option value="">Select a rating</option>
                                <option value="1">1 star</option>
                                <option value="2">2 stars</option>
                                <option value="3">3 stars</option>
                                <option value="4">4 stars</option>
                                <option value="5">5 stars</option>
                            </select>
                        </div>
                        <button className="btn btn-primary m-3" type="submit">Submit Review</button>
                    </form>
                </div>
            </div>

            {/* <ReviewsUnderMovieComponent/> */}

            {/* <div style={{ margin: "25px", textAlign: "left" }}>
                <h4 style={{ textAlign: "center" }}>Reviews</h4>

                <div style={{ textAlign: "center" }}>
                    {reviews.length === 0 && <p>Be the first one to review this movie</p>}
                </div>

                <ol >
                    {reviews.map(review => (
                        <li key={review.id} className="card mb-3">
                            <p><img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="user" width="50px" height="50px" />{review.userName}</p>
                            <p>Overall Rating: {review.rating} stars</p>
                            <p>Review: {review.review}</p>
                        </li>
                    ))}
                </ol>
            </div> */}

            <div style={{ margin: "25px", textAlign: "left" }}>
                <h4 style={{ textAlign: "center" }}>Reviews</h4>

                <div style={{ textAlign: "center" }}>
                    {reviews.length === 0 && <p>Be the first one to review this movie</p>}
                </div>

                {/* <ol>
                    {reviews.map(review => (
                        <li key={review.id} className="card mb-3">
                            <div className="card-header">
                                <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="user" width="50px" height="50px" className="review-user-img" />
                                <h5 className="review-username">{review.userName}</h5>
                            </div>
                            <div className="card-body">
                                <p className="review-rating"><StarRatingComponent
                                    name="rating"
                                    value={review.rating}
                                    starCount={5}
                                    editing={false}
                                /></p>
                                <p className="review-text">Review: {review.review}</p>
                            </div>
                        </li>
                    ))}
                </ol> */}

                <div class="review-grid">
                    {reviews.map(review => (
                        <div class="review-card" key={review.id}>
                            <div class="review-header">
                                <FontAwesomeIcon icon={faUser} style={{ width: '30px', height: '30px', borderRadius: "50%" }} size="2x" color="#000" />
                                <h5 class="review-username">{review.userName}</h5>
                            </div>
                            <div class="review-body">
                                <span class="review-rating">
                                    <StarRatingComponent
                                        name="rating"
                                        value={review.rating}
                                        starCount={5}
                                        editing={false}
                                    />
                                </span>
                                <p class="review-text">Review: {review.review}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>





        </div>


    )
} 