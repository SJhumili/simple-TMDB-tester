import axios from 'axios';
import {
    GET_IPAGE_MOVIES,
    MOVIE_TABLE_INIT,
    SET_LOADING,
    GET_SELECTED_MOVIE_DETAILS,
    GET_SELECTED_MOVIE_CASTS,
} from './types';

const ROOT_URL = process.env.API_URI || 'https://api.themoviedb.org/3';
const api_key = 'f4476e12e8f3b8b1f4cc6d683d5aae69';
//const accesstoken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDQ3NmUxMmU4ZjNiOGIxZjRjYzZkNjgzZDVhYWU2OSIsInN1YiI6IjVjM2VhM2ExYzNhMzY4Njk0ZTNmYTRiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0deV9DZwBJUW0c2sQSr2s8Q30LIo-7LP3HMKIpmpa9c';
axios.defaults.baseURL = ROOT_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

//https://image.tmdb.org/t/p/original/lhKObAfoVDU6as0FCgm6y2AAeCO.jpg

export function initmovietable() {
    return function (dispatch) {
        dispatch({type: SET_LOADING});
        axios
            .get(`/discover/movie?sort_by=popularity.desc&api_key=${api_key}&&page=${1}`)
            .then(res => {
                console.log(res);
                dispatch({type: MOVIE_TABLE_INIT, popularmovies: res.data.results, total_movies: res.data.total_results})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function getipagemovies (current_page) {
    return function (dispatch) {
        dispatch({type: SET_LOADING});
        axios
            .get(`/discover/movie?sort_by=popularity.desc&api_key=${api_key}&&page=${current_page}`)
            .then(res => {
                dispatch({type: GET_IPAGE_MOVIES, popularmovies: res.data.results, current_page:current_page})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function getselectedmoviedetails(movie_ID) {
    return function (dispatch) {
        axios
            .get(`/movie/${movie_ID}?api_key=${api_key}&append_to_response=images`)
            .then(res => {
                console.log(res);
                dispatch({type:GET_SELECTED_MOVIE_DETAILS, movie_ID:movie_ID, imoviedetails:res.data})
            })
            .catch(error => {
                console.log(error);
            });
        
        axios
            .get(`/movie/${movie_ID}/casts?api_key=${api_key}`)
            .then(res => {
                dispatch({type:GET_SELECTED_MOVIE_CASTS, imoviecasts:res.data.cast})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function getselectedmoviecasts(movie_ID) {
    return function (dispatch) {
        axios
            .get(`/movie/${movie_ID}/casts?api_key=${api_key}`)
            .then(res => {

                dispatch({type:GET_SELECTED_MOVIE_CASTS, imoviecasts:res.data.casts})
            })
            .catch(error => {
                console.log(error);
            });
    }
}