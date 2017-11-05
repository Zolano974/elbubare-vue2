import restclient from '../../restclient'

const state = {
    medias: []
}

const getters = {
    getAll: state => state.medias,
    getAllPhotos: state => state.medias.filter((elt) => {
        return elt.mediatype === "photo"
    }),
    getAllVideos: state => state.medias.filter((elt) => {
        return elt.mediatype === "video"
    }),
    getAllBySerieId: (state, serieId) => state.medias.filter((elt) => {
        return elt.serie_id === serieId
    })
}

const mutations = {

    ADD_MEDIA: (state, media) => {
        state.medias.push(media)
    },
    REMOVE_MEDIA: (state, media) => {
        state.medias.clearById(media.id)
    },
    SYNC_MEDIAS: (state, medias) => {
        state.medias = medias
    },
}

const actions = {
    addMedia: async (store, media) => {
        console.log('add media action')

        try{
            var response= await restclient.post('media/' + media.id, {media})
            store.commit('ADD_MEDIA', response.body)
        }catch(err){
            console.error('error while adding media')
        }
    },
    load: async (store) => {
        try{
            var mediasresponse = await restclient.get('medias')
            store.commit('SYNC_MEDIAS', mediasresponse.data.medias)
        }catch(err){
            console.log('trouble during media syncing : ', err)
        }
    }
}

export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}