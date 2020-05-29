<template>
  <v-app-bar
    absolute
    elevation="2"
    class='navbarColor'
  >

    <v-btn
      color="transparent"
      @click="toggleFolders"
    >
      <v-icon>mdi-folder</v-icon>
    </v-btn>

    <v-spacer></v-spacer>
    <v-toolbar-title>{{currKey}}</v-toolbar-title>

    <v-spacer></v-spacer>
    <MenuButton
      :menuAction="menuAction"
      :eventBus="$eventHub"
    />

  </v-app-bar>

</template>

<script>
import MenuButton from '@/components/MenuButton.vue';
import StringConstants from '@/constants/StringConstants';
import EventConstants from '@/constants/EventConstants';

export default {
  name: 'Navbar',
  components: { MenuButton },
  data () {
    return {
      menuAction: [
        {
          buttonName: StringConstants.ADD_NEW_FAVE,
          event: EventConstants.ADD_FAVE_EVENT,
          icon: 'mdi-heart',
          iconColor: 'pink lighten-2',
        },
        // {
        //   buttonName: StringConstants.ADD_FOLDER,
        //   event: EventConstants.ADD_FOLDER_EVENT,
        //   icon: 'mdi-folder',
        //   iconColor: 'yellow accent-4',
        // },
        {
          buttonName: StringConstants.DEL_ALL,
          event: EventConstants.DEL_ALL_EVENT,
          icon: 'mdi-delete-variant',
          iconColor: 'red lighten-3',
        },
      ],
    };
  },
  methods: {
    toggleFolders () {
      this.$eventHub.$emit(EventConstants.TOGGLE_FOLDER_EVENT);
    },
  },
  created () {
  },
  computed: {
    currKey () {
      return this.$store.getters.getCurrentKey;
    },
  },
};
</script>

<style>
.navbarColor {
  /* background: rgb(244, 230, 236);
  background: radial-gradient(
    circle,
    rgba(244, 230, 236, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  ); */
  /* background: rgb(244, 230, 236);
  background: radial-gradient(
    circle,
    rgba(244, 230, 236, 0.4682247899159664) 0%,
    rgba(148, 187, 233, 0.3449754901960784) 100%
  ); */
  /* background: rgb(244, 230, 236);
  background: radial-gradient(
    circle,
    rgba(244, 230, 236, 0.1292892156862745) 0%,
    rgba(148, 187, 233, 0.2049194677871149) 100%
  ); */
  background: rgb(244, 230, 236);
  background: radial-gradient(
    circle,
    rgba(244, 230, 236, 0.04805672268907568) 0%,
    rgba(148, 187, 233, 0.2049194677871149) 100%
  );
}
</style>
