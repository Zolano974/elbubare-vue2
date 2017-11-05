<template>
    <div class="tile is-ancestor">
        <div class="tile is-8 is-vertical is-parent">
            <!-- Last Photos -->
            <div class="tile is-child box">
                <div class="title is-5">
                    Last photos
                </div>
                <div class="content">
                    <simple-carousel    :items="threeLastPhotos"
                                        @left="shiftPhotosLeft"
                                        @right="shiftPhotosRight"
                    ></simple-carousel>
                </div>
            </div>
            <!-- Lest Videos -->
            <div class="tile is-child box">
                <div class="title is-5">
                    Last videos
                </div>
                <div class="content is-5">
                    <!--<simple-carousel    :items="threeLastVideos"-->
                                        <!--@left="shiftVideosLeft"-->
                                        <!--@right="shiftVideosRight"-->
                    <!--&gt;</simple-carousel>-->
                </div>
            </div>
        </div>
        <!-- Last Series -->
        <div class="tile is-child box">
            <div class="title is-5">
                Series
            </div>
            <div class="content">
                <simple-carousel    :items="threeLastSeries"
                                    title-key="name"
                                    subtitle-key="description"
                                    @left="shiftSeriesLeft"
                                    @right="shiftSeriesRight"
                ></simple-carousel>
            </div>
        </div>
    </div>
</template>

<script>
    import Vuex from 'vuex'
    import SimpleCarousel from '../SimpleCarousel.vue'

    export default {
        name: 'welcome-tiles',
        components: {
            SimpleCarousel
        },
        data () {
            return {
                vid: {
                    from: 0,
                    to: 3,
                },
                photo: {
                    from: 0,
                    to: 3,
                },
                serie: {
                    from: 0,
                    to: 3,
                },
            }
        },
        props: {},
        computed: {
            ...Vuex.mapGetters({
                connected: 'auth/isConnected',
                series: 'serie/getAll',
                photos: 'media/getAllPhotos',
                videos: 'media/getAllVideos',
            }),
            threeLastPhotos(){
                return this.photos.sort(function(eltA, eltB){
                    let dateA = new Date(elta.created).getTime()
                    let dateB = new Date(eltB.created).getTime()
                    return dateA < dateB
                }).slice(this.photo.from,this.photo.to)
            },
            threeLastVideos(){
                return this.videos.sort(function(eltA, eltB){
                    let dateA = new Date(elta.created).getTime()
                    let dateB = new Date(eltB.created).getTime()
                    return dateA < dateB
                }).slice(this.vid.from,this.vid.to)
            },
            threeLastSeries(){
                return this.series.sort(function(eltA, eltB){
                    let dateA = new Date(elta.created).getTime()
                    let dateB = new Date(eltB.created).getTime()
                    return dateA < dateB
                }).slice(this.serie.from,this.serie.to)
            }

        },
        methods: {
            shiftVideosLeft() {
                this.vid.from --
                this.vid.to --
            },
            shiftVideosRight() {
                this.vid.from ++
                this.vid.to ++
            },
            shiftPhotosLeft() {
                this.photo.from --
                this.photo.to --
            },
            shiftPhotosRight() {
                this.photo.from ++
                this.photo.to ++
            },
            shiftSeriesLeft() {
                this.serie.from --
                this.serie.to --
            },
            shiftSeriesRight() {
                this.serie.from ++
                this.serie.to ++
            },

        },
        mounted: function () {
            console.log('welcome tiles mounted')
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
