import axios from 'axios'

export default {
    install(Vue, options){

        //Déclaration d'un filtre global
        Vue.filter('limit', (text, length = 35) => {
            return text.slice(0, length) + '...'
        })
    }
}

