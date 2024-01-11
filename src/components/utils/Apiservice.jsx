import axios from "axios"
const API_URL = 'https://659b9bcad565feee2dab4dc5.mockapi.io'


const AxiosService = axios.create({
    baseURL: API_URL,
    headers:{
        "Content-Type":"application/json"
    }
})

export default AxiosService