<template>
    <div class="box">
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">Username</label>
                        <div class="control">
                            <input v-model="loggingUser.username"
                                   type="text"
                                   id="username"
                                   name="username"
                                   class="input"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <div class="control">
                            <label class="label">Password</label>
                            <input v-model="loggingUser.password"
                                   type="password"
                                   id="password"
                                   name="password"
                                   class="input"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column"></div>
                <div class="column">
                    <div class="field is-grouped is-grouped-right">
                        <template v-if="!connected">
                            <button class="button is-primary is-outlined is-right" @click="login()">Log In</button>
                            <button class="button is-primary is-right" @click="signup()">Signup</button>
                        </template>
                        <template v-else>
                            <button class="button is-danger is-right" @click="logout()">LogOut</button>
                        </template>

                    </div>
                </div>
            </div>
    </div>
</template>

<script>
    import Vuex from 'vuex'
    import restclient from '../../restclient'

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
        computed: {
            ...Vuex.mapGetters({
                // mapping with the names in the store data (right side)
                connected: 'auth/isConnected',
            }),
//            guest() {
//                return !connected
//            }
        },
        methods: {
            ...Vuex.mapActions({
                // mapping with the names in the store data (right side)
                setToken: 'auth/setToken',
            }),
            async login () {

                try {
                    var response = await restclient.post('/auth',
                        {
                            username: this.loggingUser.username,
                            password: this.loggingUser.password,
                            email: 'zob@zob.zob'
                        }
                    )

                    var token = response.data.token
                    //on passe par le store pour set letoken
                    this.setToken(token)

                } catch (err) {
                    this.setToken(null)
                    alert('auth failed')
                    console.error('error while logging in')
                }
            },
            async signup () {
                try {
                    var response = await restclient.post('/user',
                        {
                            username: this.loggingUser.username,
                            password: this.loggingUser.password
                        })

                    console.log('registered ok')
                } catch (err) {
                    alert('auth failed')
                    console.error('error while signing up')
                }
            },
            logout () {
                localStorage.setItem('token', "")
                localStorage.setItem('profile', "")
                this.setToken(null)
            }
        },
        mounted: function () {
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
