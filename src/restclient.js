import axios from 'axios'

//on instancie le client axios
const restclient = axios.create({
    baseURL: 'http://localhost:8000/'
    // timeout: 1000,
})

restclient.defaults.headers.common['Authorization'] = localStorage.getItem('token')

export default restclient
