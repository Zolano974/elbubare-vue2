<template>
    <div class="example container">
        <h1>Yolo</h1>
        <h2>Example with store (vuex)</h2>
        <div class="row">
            <div class="col-md-4">
                <h2>Series</h2>
                <div class="table table-stripped">
                    <!--On itère sur le GETTER du store Vuex -->
                    <table>
                        <tr v-for="serie in series">
                            <td>
                                {{ serie.id }}
                            </td>
                            <td>
                                {{ serie.name }}
                            </td>
                            <td>
                                {{ serie.description }}
                            </td>
                            <td>
                                <img :title="serie.title" :src="serie.picture"/>
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
                                <img :title="photo.title" :src="photo.file"/>
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
                                {{ video.file }}
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

  export default {
    name: 'example',
    components: {},
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
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
      ...Vuex.mapActions({
        // mapping with the names in the store actions (right side)
        loadDataStore: 'loadData',
        addPhotoStore: 'addPhoto',
        addVideoStore: 'addVideo',
        addSerieStore: 'addSerie'
      }),
      addPhoto (photo) {
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
      }
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
