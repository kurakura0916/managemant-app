<template>
    <div class="container">
        <v-flex text-center>
            <v-card
                    class="mx-auto"
                    width="600"
            >
                <v-card-title>
                    <h4>Login Form</h4>
                </v-card-title>
                <LoginForm :onlogin="handleLogin" :btnText="'ログイン'"/>
                <p class="sample">アカウントをお持ちでない方</p>
                <router-link to="/signup" class="text"><a>新規登録</a></router-link>
            </v-card>
        </v-flex>
    </div>
</template>

<script>
import LoginForm from '@/components/molecules/LoginForm.vue'

export default {
    name: 'LoginView',

    components: {
        LoginForm
    },

    methods: {
        handleLogin (authInfo) {
            return this.$store.dispatch('login', authInfo)
                .then(() => {
                    this.$router.push({path: '/reservation'})
                })
                .catch(err => this.throwReject(err))
        },
        throwReject (err)  { return Promise.reject(err) }
    }
}
</script>

<style scoped>
 .sample {
     padding-top: 10px;
     display: flex;
     align-items: center;
 }
 .sample:before, .sample:after{
     content: "";
     flex-grow: 1;
     height: 1px;
     background: darkgray;
     margin: 0 .4em;
 }
 p.sample {
     color: darkgray;
     font-family: Roboto, sans-serif;
 }
</style>
