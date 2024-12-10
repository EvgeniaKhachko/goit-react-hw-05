import axios from 'axios';

const API_KEY = '8b257e3a3f33b5c215d504c71cf544d3';
const BASE_URL = 'https://api.themoviedb.org/3/';
const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjI1N2UzYTNmMzNiNWMyMTVkNTA0YzcxY2Y1NDRkMyIsIm5iZiI6MTczMzU5OTY4Ny45MTM5OTk4LCJzdWIiOiI2NzU0YTFjN2MxYzEwYzA4Mzg2ZTkyMjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.sp4pcgcnwI3NrSqbnzfJKo5JoLsU8iixewPDc-J-DME'

const options = {
    headers: {
        Authorization: ACCESS_TOKEN,
    }
};
const fetchData = async (endpoint, params = {}) => {
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            ...options,
            params,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from TMDB:', error.response?.data || error.message);
        throw error;
    }
};


export const getTrendingMovies = async () =>
    fetchData('/trending/movie/day', {
        api_key: API_KEY,
        language: 'en-US',
    });

export const getSearchMovies = async (query) =>
    fetchData('/search/movie', {
        api_key: API_KEY,
        query,
        language: 'en-US',
        page: 1,
        include_adult: false,
    });

export const getMovieDetailsPage = async (movieId) =>
    fetchData(`movie/${movieId}`, {
        api_key: API_KEY,
        language: 'en-US',
    });



export const getMovieCredits = async (movieId) =>
    fetchData(`/movie/${movieId}/credits`, {
        api_key: API_KEY,
        language: 'en-US',
    });


export const getMovieReviews = async (movieId) =>
    fetchData(`/movie/${movieId}/reviews`, {
        api_key: API_KEY,
        language: 'en-US',
        page: 1,
    });

export default {
    getTrendingMovies,
    getSearchMovies,
    getMovieDetailsPage,
    getMovieCredits,
    getMovieReviews,
};