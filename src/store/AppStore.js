import Vue from 'vue'
import Vuex from 'vuex'
import restclient from '../restclient'

import _ from 'underscore'

 Vue.use(Vuex)

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


Array.prototype.getById = (id) => {
    return this.filter((elt) => {
        return elt.id === id
    })
}

Array.prototype.clearById = (id) => {
    return this.filter((elt) => {
        return elt.id !== id
    })
}



const mutations = {
    CLEAR_STORE: (state) => {
        state.photos = []
        state.videos = []
        state.series = []
    },
    //PHOTOS
    SYNC_PHOTOS: (state, photos) => {
        state.photos = photos
    },
    ADD_PHOTO: (state, photo) => {
        state.photos.push(photo)
    },
    REMOVE_PHOTO: (state, photo) => {
        state.photos.clearById(photo.id)
    },
    //VIDEOS
    SYNC_VIDEOS: (state, videos) => {
        state.videos = videos
    },
    ADD_VIDEO: (state, video) => {
        state.videos.push(video)
    },
    REMOVE_VIDEO: (state, video) => {
        state.videos.clearById(video.id)
    },
    //SERIES
    SYNC_SERIES: (state, series) => {
        state.series = series
    },
    ADD_SERIE: (state, serie) => {
        state.series.push(serie)
    },
    REMOVE_SERIE: (state, serie) => {
        state.series.clearById(serie.id)
    }
}
const actions = {
    // charge l'état du store via l'API
    loadData: async (store) => {
        console.log('load data async await')

        // sync photos
        try{
            var photosresponse = await restclient.get('photos')
            store.commit('SYNC_PHOTOS', photosresponse.data.photos)
        }catch(err){
            console.log('trouble during photo syncing : ', err)
        }
        // sync videos
        try{
            var videosreponse= await restclient.get('videos')
            store.commit('SYNC_VIDEOS', videosreponse.data.videos)
        }catch(err){
            console.log('trouble during photo syncing : ', err)
        }
        // sync series
        try{
            var seriesresponse = await restclient.get('series')
            store.commit('SYNC_SERIES', seriesresponse.data.series)
        }catch(err){
            console.log('trouble during photo syncing : ', err)
        }
    },
    clearData: (store) => {
        store.commit('CLEAR_STORE')
    },
    addPhoto: async (store, photo) => {
        console.log('add photo action')

        try{
            var response= await restclient.post('photo/' + photo.id, {photo})
            store.commit('ADD_PHOTO', response.body)
        }catch(err){
            console.error('error while adding photo')
        }
    },
    addVideo: async (store, video) => {
        console.log('add video action')

        try{
            //  Appel API REST
            var response= await restclient.post('video/' + video.id, {video})
            store.commit('ADD_VIDEO', response.body)
        }catch(err){
            console.error('error while adding video')
        }

    },
    addSerie: async (store, serie) => {

        try{
            //  Appel API REST
            var response = await restclient.post('serie/' + serie.id, {serie})
            store.commit('ADD_SERIE', response.data)
        }catch(err){
            console.error('error while adding serie')
        }

    }
}

let store = new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions
})

export default store

