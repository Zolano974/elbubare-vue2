import axios from 'axios'

// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

const restClient = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    // timeout: 1000,
})


export default restClient
