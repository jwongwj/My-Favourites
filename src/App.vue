<template>

  <v-app>
    <!-- <v-navigation-drawer
      app
      v-model="drawer"
    >

    </v-navigation-drawer> -->

    <!-- <v-card
      class="overflow-hidden"
      style="overflow-x: hidden;"
    >
    </v-card> -->
    <Navbar />
    <Main />

    <!-- <v-app-bar
      app
      flat
    >
      <v-toolbar flat>
        <v-toolbar-title class="text-uppercase grey--text">Test</v-toolbar-title>
        <v-app-bar-nav-icon @click="toggleNav">
          <v-icon>mdi-menu</v-icon>
        </v-app-bar-nav-icon>
      </v-toolbar>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content> -->
    <!--
    <v-footer app>

    </v-footer> -->
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Main from '@/components/Main.vue';


export default {
  components: {
    Navbar,
    Main,
  },

};

// import navsidebar from '@/components/Navbar.vue';

// export default {
//   name: 'sidebar',
//   components: {

//   },
//   data () {
//     return {
//       drawer: false,
//     };
//   },
//   methods: {
//     toggleNav () {
//       console.log('test');
//       return this.drawer = !this.drawer;
//     },
//   },
// };
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>

<style lang="sass">
  $color-pack: false

@import '~vuetify/src/styles/main.sass'
</style>
