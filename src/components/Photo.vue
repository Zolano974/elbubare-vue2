<template>
    <div class="photo container" :style="'width:'+containerWidth+'px;height:'+containerHeight+'px'">
        <img    :title="title"
                :src="getPicture()"
                :style="'width:'+width+'px;height:'+height+'px'"
        />
    </div>
</template>

<script>
    import Vuex from 'vuex'
    import restclient from '../restclient'

    export default {
        name: 'photo',
        components: {},
        props: {
            file: {
                required: true
            },
            title: {
                default: 'notitle'
            },
            width: {
                default: 120,
                type: Number
            },
            height: {
                default: 120,
                type: Number
            },
        },
        data: function () {
            return{
//                file: this.file,
//                title: this.title,
//                width: this.width,
//                height: this.height,
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
