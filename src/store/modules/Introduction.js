import restclient from '../../restclient'

const state = {
    introduction: {

    }
}

const getters = {
    get: state => state.introduction,
}

const mutations = {
    SET_INTRO: (state, intro) => {
        state.introduction = intro
    },
    //INTRO
    SYNC_INTRO: (state, intro) => {
        state.introduction = intro
    },
}

const actions = {
    setIntroduction: async (store, intro) => {
        console.log('set index intro')

        try{
            var response= await restclient.post('intro/', {intro})
            store.commit('SET_INTRO', response.body)
        }catch(err){
            console.error('error while adding media')
        }
    },
    load: async (store) => {

        // sync intro
        try{
            var introresponse = await restclient.get('intro')
            var intromooc = {
                title: "Welcom to irvinburel",
                body: "Fotograf depuis 30 ans blabla",
                picture: "/intro/aurora.jpg",
            }
            store.commit('SYNC_INTRO', intromooc)
        }catch(err){
            console.log('trouble during intro syncing', err)
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