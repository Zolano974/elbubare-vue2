import Vue from 'vue'
import Vuex from 'vuex'
import restclient from '../restclient'
import _ from 'underscore'

import actions from 'actions'
import mutations from 'mutations'
import Media from 'modules/Media'
import Serie from 'modules/Serie'

Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        media: Media,
        serie: Serie
    },
})

