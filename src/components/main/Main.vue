<template>
    <div>
        <section class="section">

            <div class="title">
                Main Yolo
            </div>
            <div class="subtitle">
                Example with composite vuex and bulma
            </div>
            <div class="columns">
                <!-- Authent -->
                <div class="column is-narrow">
                    <authent></authent>
                </div>
                <!-- Présentation -->
                <div class="column">
                    <introduction></introduction>
                </div>

            </div>

        </section>

        <hr/>

        <section class="section">

            <!-- Welcome Tiles -->
            <welcome-tiles></welcome-tiles>

            <!-- Series -->

        </section>

    </div>
</template>

<script>
    import Vuex from 'vuex'
    import restclient from '../../restclient'
    import authent from './Authent.vue'
    import photo from '../Photo.vue'
    import movie from '../Movie.vue'
    import introduction from './Introduction.vue'
    import welcomeTiles from './WelcomeTiles.vue'

    export default {
        name: 'main',
        components: {
            authent,
            photo,
            movie,
            introduction,
            welcomeTiles,
        },
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
            }
        },
        props: {},
        computed: {
            // plus besoin de data() : on accède aux données via les GETTERS du store
            ...Vuex.mapGetters({
                // mapping with the names in the store data (right side)
                medias: 'media/getAll',
                series: 'serie/getAll',
                connected: 'auth/isConnected',
            })
        },
        methods: {
            getPicture(pic){
                return '../assets/uploads' + pic
            },
            ...Vuex.mapActions({
                // mapping with the names in the store actions (right side)
                addMediaStore: 'media/addMedia',
                loadMediaStore: 'media/load',
                addVideoStore: 'media/addVideo',
                addSerieStore: 'serie/addSerie',
                loadSerieStore: 'serie/load',
                loadIntroStore: 'intro/load',
            }),
            addMedia (media) {
                var md = _.clone(media)
                this.addMediaStore(md)
            },
            addSerie (serie) {
                this.addSerieStore(serie)
            },
            loadData () {
                this.loadMediaStore()
                this.loadSerieStore()
                this.loadIntroStore()
            },
            clearData(){
                this.clearDataStore()
            },

        },
        created: function () {
            console.log('mounted zob')
            this.loadData()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
        color: #17ff00
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
<!---->
<!---->
<!--<div class="row">-->
<!--<div class="col-md-4">-->
<!--<h2>Series</h2>-->
<!--<div class="table table-stripped">-->
<!--&lt;!&ndash;On itère sur le GETTER du store Vuex &ndash;&gt;-->
<!--<table>-->
<!--<tr v-for="serie in series">-->
<!--<td>-->
<!--{{ serie.name }}-->
<!--</td>-->
<!--<td>-->
<!--{{ serie.description }}-->
<!--</td>-->
<!--<td>-->
<!--<photo :file="serie.picture" :title="serie.name" ></photo>-->
<!--</td>-->
<!--</tr>-->
<!--</table>-->
<!--</div>-->
<!--</div>-->
<!--<div class="col-md-4">-->
<!--<h2>medias</h2>-->
<!--<div class="table table-stripped">-->
<!--&lt;!&ndash;On itère sur le GETTER du store Vuex &ndash;&gt;-->
<!--<table>-->
<!--<tr v-for="media in medias">-->
<!--<td>-->
<!--{{ media.id }}-->
<!--</td>-->
<!--<td>-->
<!--{{ media.title }}-->
<!--</td>-->
<!--<td>-->
<!--{{ media.description }}-->
<!--</td>-->
<!--<td>-->
<!--&nbsp;&nbsp; {{ media.file }}-->
<!--&lt;!&ndash;<photo :file="media.file" ></photo>&ndash;&gt;-->
<!--<movie :file="media.file" ></movie>-->
<!--</td>-->
<!--</tr>-->
<!--</table>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->