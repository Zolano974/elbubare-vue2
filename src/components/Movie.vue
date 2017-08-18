<template>

    <!--TODO : gérer l'utilisation de video.js et les chemins des fichiers -->

    <div class="photo container" :style="'width:'+containerWidth+'px;height:'+containerHeight+'px'">
        <video id="my-video" class="video-js" controls preload="auto" width="640" height="264"
               poster="MY_VIDEO_POSTER.jpg" data-setup="{}">
            <source :src="file" type='video/mp4'>
            <source :src="file" type='video/webm'>
            <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a web browser that
                <a href="http://videojs.com/html5-video-support/Movie.vue" target="_blank">supports HTML5 video</a>
            </p>
        </video>
    </div>
</template>

<script>
    import Vuex from 'vuex'
    import restclient from '../restclient'

    require('../../node_modules/video.js/dist/video.js')
    require('../../node_modules/video.js/dist/video-js.min.css')

    export default {
        name: 'movie',
        components: {},
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
            return{

            }
        },
        computed: {
            containerWidth: function(){
                return this.width * 1.6
            },
            containerHeight: function(){
                return this.height * 1.3
            },
        },
        methods: {
            getPicture(){
                console.log('/static/uploads' + this.file)
                return '/static/uploads' + this.file
            },
        },
        created: function () {
            console.log('picture created')
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
