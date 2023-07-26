import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY

const getOne = (capital) => {

    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
}

export default {
    getOne: getOne,
}