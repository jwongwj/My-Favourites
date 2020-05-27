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
        :type="alertType"
        :class="alertClass"
      >
        <div v-html="htmlAlertMessage">
        </div>
      </v-alert>
    </div>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Main from '@/components/Main.vue';
import StringConstants from '@/constants/StringConstants';

export default {
  components: {
    Navbar,
    Main,
  },
  data () {
    return {
      alert: false,
      alertMessage: StringConstants.STRING_EMPTY,
      alertType: 'success',
      eventMessage: StringConstants.STRING_EMPTY,
    };
  },
  methods: {
    showAlert (itemName, message, alertType) {
      if (itemName == null) {
        itemName = StringConstants.STRING_EMPTY;
      }
      this.createAlert(itemName, message, alertType);
    },
    createAlert (itemName, message, alertType) {
      if (!this.alert) {
        this.alert = true;
        this.alertMessage = itemName;
        this.eventMessage = message;
        this.alertType = alertType;
        setTimeout(() => {
          this.resetAlerts();
        }, 5000);
      } else {
        setTimeout(() => {
          this.createAlert(itemName, message, alertType);
        }, 1000);
      }
    },
    resetAlerts () {
      this.alertMessage = StringConstants.STRING_EMPTY;
      this.eventMessage = StringConstants.STRING_EMPTY;
      this.alertType = 'success';
      this.alert = false;
    },
  },
  computed: {
    htmlAlertMessage () {
      return `<strong>${this.alertMessage}</strong>${this.eventMessage}`;
    },
    alertClass () {
      const success = this.alertType === 'success';
      return {
        alertDialog: true,
        deleteDialog: !success,
        successDialog: success,
      };
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

.alertDialog {
  max-width: 800px;
  text-align: center;
  margin: 0 auto;
}

.successDialog {
  background-color: #dbf1de !important;
}

.deleteDialog {
  background-color: #ffe9e9 !important;
}
</style>

<style lang="sass">
  $color-pack: false

@import '~vuetify/src/styles/main.sass'
</style>
