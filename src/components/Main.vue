<template>
    <section class="section">

        <div class="container">
            <div class="title">
                Main Yolo
                <!--<button class="btn btn-success" @click="login()">login</button>-->
                <!--<button class="btn btn-danger" @click="clearData()"><span class="glyphicon glyphicon-trash"></span></button>-->
            </div>
            <div class="subtitle">
                Example with composite vuex and bulma
            </div>
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <authent></authent>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <div class="columns">
                            <div class="column">
                                <div class="subtitle is-6">
                                    Charger les données dans le store
                                </div>
                            </div>
                            <div class="column">
                                <div class="button is-big is-danger is-outlined" @click="loadData">
                                    Load Data
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <h2>Series</h2>
                    <div class="table table-stripped">
                        <!--On itère sur le GETTER du store Vuex -->
                        <table>
                            <tr v-for="serie in series">
                                <td>
                                    {{ serie.name }}
                                </td>
                                <td>
                                    {{ serie.description }}
                                </td>
                                <td>
                                    <photo :file="serie.picture" :title="serie.name" ></photo>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="col-md-4">
                    <h2>medias</h2>
                    <div class="table table-stripped">
                        <!--On itère sur le GETTER du store Vuex -->
                        <table>
                            <tr v-for="media in medias">
                                <td>
                                    {{ media.id }}
                                </td>
                                <td>
                                    {{ media.title }}
                                </td>
                                <td>
                                    {{ media.description }}
                                </td>
                                <td>
                                    &nbsp;&nbsp; {{ media.file }}
                                    <!--<photo :file="media.file" ></photo>-->
                                    <movie :file="media.file" ></movie>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Vuex from 'vuex'
    import restclient from '../restclient'
    import authent from './Authent.vue'
    import photo from './Photo.vue'
    import movie from './Movie.vue'

    export default {
        name: 'example',
        components: {
            authent,
            photo,
            movie,
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
                series: 'serie/getAll'
            })
        },
        methods: {
            getPicture(pic){
                return '../assets/uploads' + pic
            },
            ...Vuex.mapActions({
                // mapping with the names in the store actions (right side)
                loadDataStore: 'main/loadData',
                clearDataStore: 'main/clearData',
                addMediaStore: 'media/addMedia',
                addVideoStore: 'media/addVideo',
                addSerieStore: 'serie/addSerie'
            }),
            addMedia (media) {
                var md = _.clone(media)
                this.addMediaStore(md)
            },
            addSerie (serie) {
                this.addSerieStore(serie)
            },
            loadData () {
                this.loadDataStore()
            },
            clearData(){
                this.clearDataStore()
            },
            async login () {

                try{
                    var response = await restclient.post('/auth', {username: 'Sophie', password: 'culculcul'})
                    var token = response.data.token
                    localStorage.setItem('token', 'Bearer ' + token)
                }catch (err){
                        console.error('error while adding photo')
                }
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
