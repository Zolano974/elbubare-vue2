import Vue from 'vue'
import Vuex from 'vuex'

import Media from './modules/Media'
import Serie from './modules/Serie'
import Auth from './modules/Auth'
import Intro from './modules/Introduction'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        auth: Auth,
        media: Media,
        serie: Serie,
        intro: Intro
    },
})

