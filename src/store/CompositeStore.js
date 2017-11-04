import Vue from 'vue'
import Vuex from 'vuex'

import Media from './modules/Media'
import Serie from './modules/Serie'
import Main from './modules/Main'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        main: Main,
        media: Media,
        serie: Serie
    },
})

