import axios from 'axios'

const restClient = axios.create({
    baseURL: 'http://localhost:4000/'
    // timeout: 1000,
})

// restclient.defaults.headers.common['Authorization'] = localStorage.getItem('token')

export default restClient
