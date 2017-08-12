import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

 Vue.use(Vuex )

const state = {
    photos: [],
    videos: [],
    series: []
}

const getters = {

    photos: state => state.photos,
    videos: state => state.videos,
    series: state => state.series
}

const restclient = axios.create({
    baseURL: 'http://localhost:8000/'
    // timeout: 1000,
})

restclient.defaults.headers.common['Authorization'] = localStorage.getItem('token')

const mutations = {
    SYNC_PHOTOS: (state, photos) => {
        state.photos = photos
    },
    ADD_PHOTO: (state, photo) => {
        state.photos.push(photo)
    },
    SYNC_VIDEOS: (state, videos) => {
        state.videos = videos
    },
    ADD_VIDEO: (state, video) => {
        state.videos.push(video)
    },
    SYNC_SERIES: (state, series) => {
        state.series = series
    },
    ADD_SERIE: (state, serie) => {
        state.series.push(serie)
    }
}
const actions = {
    // charge l'état du store via l'API
    loadData: (store) => {
        console.log('load data')

        // sync photos
        restclient.get('photos')
            .then(
                response => {
                    console.log(response.data)
                    store.commit('SYNC_PHOTOS', response.data.photos)
                },
                response => {
                    console.log('error while syncing photos')
                }
            )

        // sync videos
        restclient.get('videos').then(
          response => {
            store.commit('SYNC_VIDEOS', response.data.videos)
          },
          response => {
            console.log('error while syncing videos')
          },
        )
        // sync series
        restclient.get('series').then(
          response => {
            store.commit('SYNC_SERIES', response.data.series)
          },
          response => {
            console.log('error while syncing series')
          },
        )
    },
    addPhoto: (store, photo) => {
        console.log('add photo action')

        //  Appel API REST
        restclient.post('photo/' + photo.id, {photo}).then(
            //  success callback
            response => {
                //  commit via le mutateur
                store.commit('ADD_PHOTO', response.body)
            },
            //  error callback
            response => {
                console.error('error while adding photo')
            }
        )
    },
    addVideo: (store, video) => {
        Vue.http.options.root = 'http://localhost:8000'
        //  Appel API REST
        Vue.http.post('video/' + video.id, {video}).then(
            //  success callback
            response => {
                //  commit via le mutateur
                store.commit('ADD_VIDEO', response.body)
            },
            //  error callback
            response => {
                console.error('error while adding video')
            }
        )
    },
    addSerie: (store, serie) => {
        Vue.http.options.root = 'http://localhost:8000'
        //  Appel API REST
        Vue.http.post('serie/' + serie.id, {serie}).then(
            //  success callback
            response => {
                //  commit via le mutateur
                store.commit('ADD_SERIE', response.body)
            },
            //  error callback
            response => {
                console.error('error while adding serie')
            }
        )
    }
}

let store = new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions
})

export default store

