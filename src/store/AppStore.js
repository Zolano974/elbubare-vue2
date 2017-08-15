import Vue from 'vue'
import Vuex from 'vuex'
import restclient from '../restclient'

import _ from 'underscore'

 Vue.use(Vuex)

const state = {
    series: [],
    medias: []
}

const getters = {
    series: state => state.series,
    medias: state => state.medias,
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
        state.series = []
        state.medias = []
    },
    //mediaS
    SYNC_MEDIAS: (state, medias) => {
        state.medias = medias
    },
    ADD_MEDIA: (state, media) => {
        state.medias.push(media)
    },
    REMOVE_MEDIA: (state, media) => {
        state.medias.clearById(media.id)
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

        // sync medias
        try{
            var mediasresponse = await restclient.get('medias')
            store.commit('SYNC_MEDIAS', mediasresponse.data.medias)
        }catch(err){
            console.log('trouble during media syncing : ', err)
        }
        // sync series
        try{
            var seriesresponse = await restclient.get('series')
            store.commit('SYNC_SERIES', seriesresponse.data.series)
        }catch(err){
            console.log('trouble during series syncing : ', err)
        }
    },
    clearData: (store) => {
        store.commit('CLEAR_STORE')
    },
    addMedia: async (store, media) => {
        console.log('add media action')

        try{
            var response= await restclient.post('media/' + media.id, {media})
            store.commit('ADD_MEDIA', response.body)
        }catch(err){
            console.error('error while adding media')
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

