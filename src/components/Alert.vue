<template>
  <div class="alertDiv">
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
</template>

<script>
import GlobalMixins from '@/mixins/GlobalMixins';
import StringConstants from '@/constants/StringConstants';
import EventConstants from '@/constants/EventConstants';

export default {
  mixins: [GlobalMixins],
  data () {
    return {
      alert: false,
      alertMessage: StringConstants.STRING_EMPTY,
      alertType: StringConstants.SUCCESS_ALERT,
      eventMessage: StringConstants.STRING_EMPTY,
    };
  },
  computed: {
    htmlAlertMessage () {
      return `<strong>${this.alertMessage}</strong>${this.eventMessage}`;
    },
    alertClass () {
      const success = this.alertType === StringConstants.SUCCESS_ALERT;
      return {
        alertDialog: true,
        deleteDialog: !success,
        successDialog: success,
      };
    },
  },
  created () {
    this.$eventHub.$on(EventConstants.SHOW_ALERT_EVENT, this.showAlert);
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
      this.alertType = StringConstants.SUCCESS_ALERT;
      this.alert = false;
    },

  },
};
</script>

<style>
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

.alertDiv {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: block;
}
</style>

<style lang="sass">
  $color-pack: false

@import '~vuetify/src/styles/main.sass'
</style>
