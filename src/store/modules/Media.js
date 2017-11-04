import restclient from '../../restclient'

const state = {
    medias: []
}

const getters = {
    getAll: state => state.medias,
}

const mutations = {

    ADD_MEDIA: (state, media) => {
        state.medias.push(media)
    },
    REMOVE_MEDIA: (state, media) => {
        state.medias.clearById(media.id)
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
}

export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}