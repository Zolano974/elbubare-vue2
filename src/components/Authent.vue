<template>
    <div class="example container">
        <div class="row">
            <div class="form-group">
                <div class="row">
                    <div class="col-xs-4">
                        <label for="username">Username</label>
                    </div>
                    <div class="col-xs-8">
                        <input v-model="loggingUser.username"
                               id="username"
                               name="username"
                               class="form-control"
                               type="text" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4">
                        <label for="password">Password</label>
                    </div>
                    <div class="col-xs-8">
                        <input v-model="loggingUser.password"
                               id="password"
                               name="password"
                               class="form-control"
                               type="password"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-xs-offset-4 text-left">
                        <button class="btn btn-success" @click="login()">Log In</button>
                        <button class="btn btn-info" @click="signup()">Signup</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vuex from 'vuex'
    import restclient from '../restclient'

    export default {
        name: 'authent',
        components: {},
        data () {
            return {
                loggingUser: {
                    username: "",
                    password: "",
                }
            }
        },
        props: {},
        computed: {
        },
        methods: {
            async login () {

                try{
                    var response = await restclient.post('/auth',
                        {
                            username: this.loggingUser.username,
                            password: this.loggingUser.password,
                            email: 'zob@zob.zob'
                        })

                    var token = response.data.token
                    localStorage.setItem('token', 'Bearer ' + token)
                }catch (err){
                    alert('auth failed')
                    console.error('error while logging in')
                }
            },
            async signup () {
                try{
                    var response = await restclient.post('/user',
                        {
                            username: this.loggingUser.username,
                            password: this.loggingUser.password,
                        })

                    console.log('registered ok')
                }catch (err){
                    alert('auth failed')
                    console.error('error while signing up')
                }
            }
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
