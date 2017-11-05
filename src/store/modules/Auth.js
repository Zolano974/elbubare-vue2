import tokenhelper from '../../helpers/tokenhelper'
import jwt_decode from 'jwt-decode'


const state = {
    token: null
}

const getters = {

    getToken: (state) => tokenhelper.fetchToken(state),
    // getToken: (state) => state.token,

    isConnected: (state) => {

        var now = new Date().getTime() / 1000   // en s

        var token = tokenhelper.fetchToken(state)
        console.log("TOKEN")
        console.log(token)

        try{
            // return token !== null
            var profile = jwt_decode(token)
        }catch(err){
            profile = null
            console.log(err)
        }

        return (
            profile instanceof Object   //profile est défini
            && profile !== null
            && now < profile.exp        // le jeton est toujours valide
            && profile.group === "zob"  // l'utilisateur appartient au groupe zob
        )

    },


    /**
     * Renvoie le payload du jwt
     * @param state
     * @returns {*}
     */
    getProfile: (state) => {
        let token = tokenhelper.fetchToken(state)
        let profile = null
        try{
            profile = jwt_decode(token)
        }catch(err){
            console.log(err)
        }

        return (profile instanceof Object && profile !== null && profile !== undefined) ? profile : null
        // return null
    }

}

const mutations = {

    SET_TOKEN: (state, token) => {
        state.token = token
    }
}

const actions = {

    setToken: (store, token) => {
        store.commit('SET_TOKEN', token)
        let strtoken = (token === null) ? '' : token
        //on stockeaussi en localstorage
        localStorage.setItem('token', strtoken)
    }
}

export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}