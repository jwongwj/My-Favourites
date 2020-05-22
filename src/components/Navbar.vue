<template>
  <v-app-bar
    absolute
    color="white"
    elevate-on-scroll
    scroll-target="#scrolling-techniques-3"
  >
    <v-toolbar-title>Favourites</v-toolbar-title>

    <v-spacer></v-spacer>
    <MenuButton :actionItem="menuAction" />

  </v-app-bar>

</template>

<script>
import MenuButton from '@/components/MenuButton.vue';
import ActionConstants from '@/constants/ActionConstants';


export default {
  name: 'Navbar',
  components: {
    MenuButton,
  },
  data () {
    return {
      value: false,
      menuAction: ActionConstants.MENU_ACTION,
    };
  },
};
</script>

<style>
</style>
