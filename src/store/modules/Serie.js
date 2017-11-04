import restclient from '../../restclient'

const state = {
    series: []
}

const getters = {
    series: state => state.series,
}

const mutations = {
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
    addSerie: async (store, serie) => {

        try {
            //  Appel API REST
            var response = await restclient.post('serie/' + serie.id, {serie})
            store.commit('ADD_SERIE', response.data)
        } catch (err) {
            console.error('error while adding serie')
        }

    }
}

export default {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
}