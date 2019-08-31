<template>
    <div class="container">
        <v-flex text-center>
            <v-card
                    class="mx-auto"
                    width="600"
            >
                <v-card-title>
                    <h4>Signup Form</h4>
                </v-card-title>
                <LoginForm :onlogin="handleLogin" :btnText="'新規登録'" :success="this.signupSuccess"/>
                <p class="sample">既に登録済みの方</p>
                <router-link to="/login" class="text"><a>ログイン</a></router-link>
            </v-card>
        </v-flex>
    </div>
</template>

<script>
import LoginForm from '@/components/molecules/LoginForm.vue'

export default {
    name: "SignupView",

    components: {
        LoginForm
    },

    data () {
      return {
          signupSuccess: false
      }
    },

    methods: {
        handleLogin (authInfo) {
            return this.$store.dispatch('signup', authInfo)
                .then(() => {
                    this.signupSuccess = true
                })
                .catch(err => this.throwReject(err))
        },
        throwReject (err) { return Promise.reject(err) }
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
