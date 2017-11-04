import restclient from '../../restclient'

const state = {
}

const getters = {
}

const mutations = {
    CLEAR_STORE: (state) => {
        state.series = []
        state.medias = []
    },


}

const actions = {
    // charge l'état du store via l'API
    loadData: async (store) => {


    },
    clearData: (store) => {
        store.commit('CLEAR_STORE')
    },
}

export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}