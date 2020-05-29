<template>
  <v-app>
    <div @contextmenu.prevent="">
      <Navbar />
      <FolderSidebar />
      <div :class="mainContentDiv">
        <Main />
      </div>
      <Alert />
    </div>
  </v-app>
</template>

<script>
import GlobalMixins from '@/mixins/GlobalMixins';
import Navbar from '@/components/Navbar.vue';
import Main from '@/components/Main.vue';
import StringConstants from '@/constants/StringConstants';
import Alert from '@/components/Alert.vue';
import FolderSidebar from '@/components/FolderSidebar.vue';

// const { localStorage } = window;

export default {
  mixins: [GlobalMixins],
  components: {
    Navbar,
    Main,
    Alert,
    FolderSidebar,
  },
  data () {
    return {
      tFolder: true,
      folders: [],
      folderName: StringConstants.STRING_EMPTY,
      initialLoad: false,
      folderHeader: StringConstants.STRING_EMPTY,
    };
  },
  computed: {
    mainContentDiv () {
      return {
        mainContent: true,
        width70: this.tFolder,
        width100: !this.tFolder,
      };
    },
  },
  created () {

  },
  methods: {
    toggleFolder () {
      this.tFolder = !this.tFolder;
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

.mainContent {
  display: block;
  padding-top: 4%;
  float: left;
}

.width30 {
  width: 30%;
}

.width70 {
  width: 70%;
}

.width100 {
  width: 100%;
}
</style>

<style lang="sass">
  $color-pack: false

@import '~vuetify/src/styles/main.sass'
</style>
