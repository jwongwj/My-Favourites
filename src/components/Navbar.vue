<template>
  <v-app-bar
    absolute
    color="white"
    elevate-on-scroll
    scroll-target="#scrolling-techniques-7"
  >
    <v-toolbar-title>Favourites</v-toolbar-title>

    <v-spacer></v-spacer>
    <MenuButton
      :menuAction="menuAction"
      :eventBus="$eventHub"
    />

  </v-app-bar>

</template>

<script>
import MenuButton from '@/components/MenuButton.vue';
import StringConstants from '../constants/StringConstants';
import EventConstants from '../constants/EventConstants';

export default {
  name: 'Navbar',
  components: {
    MenuButton,
  },
  data () {
    return {
      menuAction: [
        {
          buttonName: StringConstants.ADD_NEW_FAVE,
          event: EventConstants.ADD_FAVE_EVENT,
          icon: 'mdi-heart',
        },
        {
          buttonName: StringConstants.DEL_ALL,
          event: EventConstants.DEL_ALL_EVENT,
          icon: 'mdi-delete-variant',
        },
      ],
    };
  },
};
</script>

<style>
</style>
