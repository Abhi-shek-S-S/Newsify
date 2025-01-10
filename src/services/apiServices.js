import axios from "axios";


export const newsApi = {
    getSources: () =>
        axios.get(`https://newsapi.org/v2/top-headlines/sources?apiKey=${API_KEY}`),

    getArticles: (endpoint, params) =>
        axios.get(`https://newsapi.org/v2/${endpoint}?${new URLSearchParams(params)}`)
};