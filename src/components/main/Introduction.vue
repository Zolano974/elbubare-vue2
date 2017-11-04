<template>
    <div class="box">


        <div class="columns">
            <div class="column is-half">

                <div class="columns">
                    <div class="column">
                        <template v-if="!editMode">
                            <div class="subtitle is-5">
                                {{introStore.title}}
                                <!--{{intro.title}}-->
                            </div>
                        </template>
                        <template v-else>
                            <div class="field">
                                <div class="control">
                                    <label class="label" ></label>
                                    <input
                                        :value="getTitle"
                                        @input="setTitle"
                                        class="input"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <template v-if="!editMode">
                            {{introStore.body}}
                        </template>
                        <template v-else>
                            <textarea
                                    :value="getBody"
                                    @input="setBody"
                                    class="input"
                                    type="textarea"
                            >
                            </textarea>
                        </template>

                    </div>
                </div>
            </div>
            <div class="column">
                <template v-if="!editMode">
                    <img    title="welcome"
                            :src="getPicture()"
                            style="max-width:300px;max-height:100px;"
                    />

                </template>
                <template v-else>
                    <input
                            @change="setFile"
                            type="file"
                            value="upload"
                    />
                    <!--<file-upload-->
                            <!--ref="upload"-->
                            <!--v-model="files"-->
                            <!--post-action="/post.method"-->
                            <!--put-action="/put.method"-->
                            <!--@input-file="inputFile"-->
                            <!--@input-filter="inputFilter"-->
                    <!--&gt;-->
                        <!--Upload file-->
                    <!--</file-upload>-->
                </template>
            </div>
        </div>
        <div class="columns">
            <div class="column is-half"></div>
            <div class="column">

                <template v-if="!editMode"  >
                    <div class="button is-big is-info is-outlined" @click="toggleEditMode">
                        Edit
                    </div>
                </template>
                <template v-else >
                    <div class="button is-big is-info is-outlined" @click="setIntroduction">
                        Save
                    </div>
                </template>

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
    import _ from 'underscore'
    import VueUploadComponent from 'vue-upload-component'

    export default {
        name: 'introduction',
        components: {
            FileUpload: VueUploadComponent
        },
        data () {
            return {
                editMode: false,
                intro: {
                    title: null,
                    body: null,
                },
                files: [],
                file: null
            }
        },
        computed: {
            getTitle () {
                return (this.intro.title !== null) ? this.intro.title : this.introStore.title
            },
            getBody () {
                return (this.intro.body !== null) ? this.intro.body : this.introStore.body
            },
            ...Vuex.mapGetters({
                // mapping with the names in the store data (right side)
                introStore: 'intro/get',
            })
        },
        methods: {
            async setIntroduction () {
                  try{
                    var response = await restclient.post('/intro', {
                        title: this.intro.title,
                        body: this.intro.body,
                        picture: this.file
                    },
                    {
                        headers: {
//                            'Authorization': localStorage.getItem('token'),
//                            'content-type': 'multipart/form-data;'
                        }
                    })
                    console.log(response.data)
                  }catch(err){
                      console.log(err)
                  }
            },
            setFile: function(e) {
                console.log(e.target.files)

                var file = e.target.files[0]
                console.log(file)
                this.file = file
            },
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
            setTitle: function(e) {
                console.log('set title ' + e.target.value)
                this.intro.title = e.target.value
            },
            setBody:function(e) {
                console.log('set body ' + e.target.value)
                this.intro.body = e.target.value
            },
            /**
             * Has changed
             * @param  Object|undefined   newFile   Read only
             * @param  Object|undefined   oldFile   Read only
             * @return undefined
             */
            inputFile: function (newFile, oldFile) {
                if (newFile && oldFile && !newFile.active && oldFile.active) {
                    // Get response data
                    console.log('response', newFile.response)
                    if (newFile.xhr) {
                        //  Get the response status code
                        console.log('status', newFile.xhr.status)
                    }
                }
            },
            /**
             * Pretreatment
             * @param  Object|undefined   newFile   Read and write
             * @param  Object|undefined   oldFile   Read only
             * @param  Function           prevent   Prevent changing
             * @return undefined
             */
            inputFilter: function (newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    // Filter non-image file
                    if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
                        return prevent()
                    }
                }
                // Create a blob field
                newFile.blob = ''
                let URL = window.URL || window.webkitURL
                if (URL && URL.createObjectURL) {
                    newFile.blob = URL.createObjectURL(newFile.file)
                }
            }

        },
        created: function () {
            console.log('introduction created')
        },
        mounted: function () {
            console.log('introduction mounted')
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
