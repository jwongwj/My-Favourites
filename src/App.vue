<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-container fluid>
        <Main />
      </v-container>
    </v-content>
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
