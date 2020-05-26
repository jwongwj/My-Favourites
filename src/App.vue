<template>
  <v-app>
    <Navbar />
    <Main />
    <div style="margin-bottom: 0px;">
      <v-alert
        v-model="alert"
        dismissible
        border="left"
        elevation="2"
        colored-border
        type="success"
        class="alertDiaglog"
      >
        <div>
          <div v-html="htmlAlertMessage"></div>
        </div>
      </v-alert>
    </div>
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
  data () {
    return {
      alert: false,
      alertMessage: '',
    };
  },
  methods: {
    showAlert (msg) {
      this.alert = true;
      this.alertMessage = msg;
      setTimeout(() => {
        this.alert = false;
      }, 5000);
    },
  },
  computed: {
    htmlAlertMessage () {
      return `<strong>${this.alertMessage}</strong> has been added to Favourites`;
    },
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

.alertDiaglog {
  max-width: 800px;
  text-align: center;
  margin: 0 auto;
  background-color: #dbf1de !important;
}
</style>

<style lang="sass">
  $color-pack: false

@import '~vuetify/src/styles/main.sass'
</style>
