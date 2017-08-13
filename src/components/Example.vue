<template>
    <div class="example container">
        <h1>Yolo
            <button class="btn btn-success" @click="login()">login</button>
            <button class="btn btn-danger" @click="clearData()"><span class="glyphicon glyphicon-trash"></span></button>
        </h1>
        <h2>Example with store (vuex)</h2>
        <div class="row">
            <authent></authent>
        </div>
        <div class="row">
            <div class="col-md-4">
                <h2>Series</h2>
                <div class="table table-stripped">
                    <!--On itère sur le GETTER du store Vuex -->
                    <table>
                        <!--<tr v-for="serie in series">-->
                            <!--<td>-->
                                <!--{{ serie.id }}-->
                            <!--</td>-->
                            <!--<td>-->
                                <!--{{ serie.name }}-->
                            <!--</td>-->
                            <!--<td>-->
                                <!--{{ serie.description }}-->
                            <!--</td>-->
                            <!--<td>-->

                                <!--<img :title="serie.title" :src="picture_base_path + serie.picture"/>-->
                            <!--</td>-->
                        <!--</tr>-->
                        <tr v-for="serie in series">
                            <td>
                                {{ getPicture(serie.picture) }}
                            </td>
                            <td>
                                <photo :file="serie.picture" ></photo>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="col-md-4">
                <h2>Photos</h2>
                <div class="table table-stripped">
                    <!--On itère sur le GETTER du store Vuex -->
                    <table>
                        <tr v-for="photo in photos">
                            <td>
                                {{ photo.id }}
                            </td>
                            <td>
                                {{ photo.title }}
                            </td>
                            <td>
                                {{ photo.description }}
                            </td>
                            <td>
                                <photo :file="photo.file" ></photo>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="col-md-4">
                <h2>Videos</h2>
                <div class="table table-stripped">
                    <!--On itère sur le GETTER du store Vuex -->
                    <table>
                        <tr v-for="video in videos">
                            <td>
                                {{ video.id }}
                            </td>
                            <td>
                                {{ video.title }}
                            </td>
                            <td>
                                {{ video.description }}
                            </td>
                            <td>
                                <photo :file="video.file" ></photo>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vuex from 'vuex'
    import restclient from '../restclient'
    import authent from './Authent.vue'
    import photo from './Photo.vue'

    export default {
        name: 'example',
        components: {
            authent,
            photo,
        },
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
//                picture_base_path: '/srv/node/restful/uploads'
                base_path: '../assets/uploads/series/2017-08-12-12-38-37-dna.png'
            }
        },
        props: {},
        computed: {
            // plus besoin de data() : on accède aux données via les GETTERS du store
            ...Vuex.mapGetters({
                // mapping with the names in the store data (right side)
                photos: 'photos',
                videos: 'videos',
                series: 'series'
            })
        },
        methods: {
            getPicture(pic){
                return '../assets/uploads' + pic
            },
            ...Vuex.mapActions({
                // mapping with the names in the store actions (right side)
                loadDataStore: 'loadData',
                clearDataStore: 'clearData',
                addPhotoStore: 'addPhoto',
                addVideoStore: 'addVideo',
                addSerieStore: 'addSerie'
            }),
            addPhoto (photo) {
                var tof = _.clone(photo)
                this.addPhotoStore(photo)
            },
            addVideo (video) {
                this.addVideoStore(video)
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
