<template>
  <v-app id="inspire">
    <v-navigation-drawer
            v-model="drawer"
            app
    >
      <v-list dense>

        <v-list-item @click="handleHome">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ホーム</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="handleReservation">
          <v-list-item-action>
            <v-icon>assignment_ind</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>予約管理</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="handleLogin">
          <v-list-item-action>
            <v-icon>lock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ログイン</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
            app
            color="blue darken-4"
            dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>My App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon>person</v-icon>
      {{this.$store.state.auth.email}}
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer
            color="blue darken-4"
            app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: null
  }),
  methods: {
      handleLogin () {
          this.$router.push({path: 'login'})
      },

      handleHome () {
          this.$router.push({path: '/'})
      },

      handleReservation () {
          this.$router.push({path: '/reservation'})
      }
  }
}
</script>

<style scoped>
  v-list-action {
    padding: 10px;
  }
  v-list-item-title {
    font-size: 1.2em;
  }
</style>
