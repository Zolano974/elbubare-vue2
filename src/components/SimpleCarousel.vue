<template>
    <div class="level">
        <div class="tile is-ancestor">
            <div class="tile is-1">
                <!-- fleche gauche -->
                <div class="button is-small" @click="shiftLeft">
                    <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                </div>
            </div>
            <div class="tile is-10 is-parent card">
                <div class="is-child card" v-for="item in formatedItems">
                    <div class="card-header subtitle is-4">
                        {{item.title}}
                    </div>
                    <!--<div class="subtitle is-5">-->
                    <!--</div>-->
                    <div class="card-content">
                        <div class="media">
                            <figure class="image">
                                <img    :title="item.title"
                                        :src="item.picture"
                                />
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tile is-1">
                <!-- fleche droite -->
                <div class="button is-small" @click="shiftRight">
                    <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vuex from 'vuex'

    export default {
        name: 'simple-carousel',
        components: {},
        props: {
            items: {
                require: true
            },
            pictureKey: {
                require: true,
                default: 'picture'
            },
            titleKey: {
                require: true,
                default: 'title'
            },
            subtitleKey: {
                require: true,
                default: 'subtitle'
            }
        },
        data () {
            return {}
        },
        computed: {
            formatedItems(){
                var titleKey = this.titleKey
                var pictureKey = this.pictureKey
                return this.items.map(function (elt) {
                    return {
                        title: elt[titleKey],
                        picture: '/static/uploads' + elt[pictureKey]
//                        picture: '/static/uploads/intro/aurora.jpg'
                    }
                })
            }
        },
        methods: {
            shiftLeft(){
                console.log('shift left')
                this.$emit('left')
            },
            shiftRight(){
                console.log('shift right')
                this.$emit('right')
            }
        },
        mounted: function () {
            console.log('simple carousel mounted')
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
