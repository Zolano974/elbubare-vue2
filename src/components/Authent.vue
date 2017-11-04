<template>
    <section class="section">

        <div class="container">
            <div class="columns">
                <div class="column">
                    <div class="field is-grouped is-horizontal">
                        <div class="control">
                                <label for="username" class="label">Username</label>
                                <input v-model="loggingUser.username"
                                       id="username"
                                       name="username"
                                       class="input"
                                       type="text"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="field is-horizontal">
                        <div class="control">
                            <label for="password" class="label">Password</label>
                            <input v-model="loggingUser.password"
                                   id="password"
                                   name="password"
                                   class="input"
                                   type="password"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column"></div>
                <div class="column">
                    <div class="field is-grouped is-grouped-right">

                        <button class="button is-primary is-outlined is-right" @click="login()">Log In</button>
                        <button class="button is-primary is-right" @click="signup()">Signup</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
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
                    username: "Sophie",
                    password: "culculcul",
                }
            }
        },
        props: {},
        computed: {},
        methods: {
            async login () {

                try {
                    var response = await restclient.post('/auth',
                        {
                            username: this.loggingUser.username,
                            password: this.loggingUser.password,
                            email: 'zob@zob.zob'
                        })

                    var token = response.data.token
                    localStorage.setItem('token', 'Bearer ' + token)
                } catch (err) {
                    alert('auth failed')
                    console.error('error while logging in')
                }
            },
            async signup () {
                try {
                    var response = await restclient.post('/user',
                        {
                            username: this.loggingUser.username,
                            password: this.loggingUser.password,
                        })

                    console.log('registered ok')
                } catch (err) {
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
