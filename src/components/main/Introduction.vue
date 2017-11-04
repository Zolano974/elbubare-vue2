<template>
    <div class="box">
        <div class="columns">
            <div class="column is-half">

                <div class="columns">
                    <div class="column">
                        <div class="subtitle is-5">
                            {{introStore.title}}
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        {{introStore.body}}
                    </div>
                </div>
            </div>
            <div class="column">
                <img    title="welcome"
                        :src="getPicture()"
                        style="max-width:300px;max-height:100px;"
                />
            </div>
        </div>
        <div class="columns">
            <div class="column is-half"></div>
            <div class="column">

                <div class="button is-big is-info is-outlined" @click="toggleEditMode">
                    <template v-if="!editMode">
                        Edit
                    </template>
                    <template v-else>
                        View
                    </template>
                </div>

                <div class="button is-big is-warning is-outlined" @click="loadData">
                    Load Data
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vuex from 'vuex'
    import restclient from '../../restclient'

    export default {
        name: 'introduction',
        components: {},
        data () {
            return {
                editMode: false
            }
        },
        computed: {
            ...Vuex.mapGetters({
                // mapping with the names in the store data (right side)
                introStore: 'intro/get',
            })
        },
        methods: {
            toggleEditMode(){
                this.editMode = !this.editMode
            },
            getPicture () {
                return '/static/uploads' + this.introStore.picture
            },
            ...Vuex.mapActions({
                // mapping with the names in the store actions (right side)
                loadMediaStore: 'media/load',
                loadSerieStore: 'serie/load',
                loadIntroStore: 'intro/load'
            }),
            loadData () {
                this.loadMediaStore()
                this.loadSerieStore()
                this.loadIntroStore()
            },
        },
        created: function () {
            console.log('auth mounted')
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
