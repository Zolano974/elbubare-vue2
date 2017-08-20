<template>

    <!--TODO : gérer l'utilisation de video.js et les chemins des fichiers -->

    <div class="photo container" :style="'width:'+containerWidth+'px;height:'+containerHeight+'px'">

        <!--<video id="my-video" class="video-js" controls preload="auto" width="640" height="264"-->
               <!--poster="MY_VIDEO_POSTER.jpg" data-setup="{}">-->
            <!--<source :src="file" type='video/mp4'>-->
            <!--&lt;!&ndash;<source :src="file" type='video/webm'>&ndash;&gt;-->
            <!--<p class="vjs-no-js">-->
                <!--To view this video please enable JavaScript, and consider upgrading to a web browser that-->
                <!--<a href="http://videojs.com/html5-video-support/Movie.vue" target="_blank">supports HTML5 video</a>-->
            <!--</p>-->
        <!--</video>-->

        <video-player  class="video-player-box"
                       ref="videoPlayer"
                       poster="logo.png"
                       :options="playerOptions"
                       :playsinline="true"
                       customEventName="customstatechangedeventname"

                       @play="onPlayerPlay($event)"
                       @pause="onPlayerPause($event)"
                       @ended="onPlayerEnded($event)"
                       @waiting="onPlayerWaiting($event)"
                       @playing="onPlayerPlaying($event)"
                       @loadeddata="onPlayerLoadeddata($event)"
                       @timeupdate="onPlayerTimeupdate($event)"
                       @canplay="onPlayerCanplay($event)"
                       @canplaythrough="onPlayerCanplaythrough($event)"

                       @statechanged="playerStateChanged($event)"
                       @ready="playerReadied">
        </video-player>
    </div>
</template>

<script>
    import Vue from 'vue'
//    import Vuex from 'vuex'
    import restclient from '../restclient'

    require('video.js/dist/video-js.css')
//  IMPORT GLOBAL
//    import VueVideoPlayer from 'vue-video-player'
//    Vue.use(VueVideoPlayer)

    // IMPORT COMPONENT
    import { videoPlayer } from 'vue-video-player'

    export default {
        name: 'movie',
        components: {
            videoPlayer
        },
        props: {
            file: {
                required: true
            },
            width: {
                default: 210,
                type: Number
            },
            height: {
                default: 210,
                type: Number
            },
        },
        data: function () {
            return {
                playerOptions: {
                    // videojs options
                    muted: true,
                    language: 'en',
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    sources: [{
                        type: "video/mp4",
                        src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
//                        src: this.filepath
                    }],
                    poster: "/static/images/author.jpg",
                }
            }
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            },
            filepath() {
                return '/static/uploads' + this.file
            },
            containerWidth: function(){
                return this.width * 1.6
            },
            containerHeight: function(){
                return this.height * 1.3
            },
        },
        methods: {
            getFile(){
                console.log('/static/uploads' + this.file)
                return '/static/uploads' + this.file
            },
            // listen event
            onPlayerPlay(player) {
                // console.log('player play!', player)
            },
            onPlayerPause(player) {
                // console.log('player pause!', player)
            },
            // ...player event
            // or listen state event
            playerStateChanged(playerCurrentState) {
                // console.log('player current update state', playerCurrentState)
            },
            // player is ready
            playerReadied(player) {
                console.log('the player is readied', player)
                // you can use it to do something...
                // player.[methods]
            }
        },
        created: function () {
//            videojs('my-video')
//            console.log('movie created')
        },
        mounted: () => {
//            videojs.videojs('my-video')
//            console.log('movie created')
//            alert(this.filepath)
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

    .photo{
        border: 1px solid rgba(162,162,162,0.69);
        border-radius: 3px;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 10px;
        padding-top: 8%;
        /*                 horizontal   vertical    blur-radius spread-radius   color     */
        webkit-box-shadow: 5px          4px         10px        -2px            rgba(87,87,87,1);
        -moz-box-shadow: 5px 4px 10px -2px rgba(87,87,87,1);
        box-shadow: 5px 4px 10px -2px rgba(87,87,87,1);
    }
</style>
