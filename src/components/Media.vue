<template>
    <div class="row">

        <!-- TITRE + DESCRIPTION -->
        <div class="col-md-5">
            <div class="row">
                <b class="text-center">{{ media.title }}</b>
            </div>
            <div class="row">
                <p>
                    {{ media.description }}
                </p>
            </div>
        </div>
        <div class="col-md-7">
            <photo v-if="isVideo" :file="media.file" :width="width" :height="height"></photo>
            <movie v-else :file="media.file" :width="width" :height="height"></movie>
        </div>
    </div>
</template>

<script>
    import Vuex from 'vuex'
    import restclient from '../restclient'
    import photo from './Photo.vue'
    import movie from './Movie.vue'

    export default {
        name: 'media',
        components: {
            photo,
            movie
        },
        props: {
            media: {
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
        data() {
            return{

            }
        },
        computed: {
            isVideo: function(){
                return this.media.mediatype === 'video'
            },
        },
        methods: {
            getPicture(){
                console.log('/static/uploads' + this.file)
                return '/static/uploads' + this.file
            },
        },
        created: function () {
            console.log('media component created')
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
