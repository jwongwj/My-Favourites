<template>
  <div>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="showDialog"
          max-width="600px"
        >
          <v-card>
            <v-card-title>
              <span class="headline">{{ folderHeader }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="listForm">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="folderName"
                        :value="folderName"
                        label="Folder Name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="close()"
              >Close</v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="saveFolder()"
              >Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <div>
      <transition
        name="slide-fade"
        mode="out-in"
      >
        <div
          v-show="tFolder"
          class="folderContent width30 height100 padding8 minWidth600"
        >
          <v-list>
            <v-list-item-group>
              <Draggable
                v-model="folders"
                @end="onEnd"
                draggable=".dragFolders"
                group="{group:{ pull:'dragItem', name: 'dragItem'}}"
              >
                <div
                  slot="header"
                  role="dragItem"
                  style="width: 100%; display: inline-block"
                >
                  <v-btn
                    text
                    @click="addFolder"
                    style="float: right; margin-right: 3%;"
                  >
                    <v-icon
                      color="green darken-4"
                      style="margin-right: 5%;"
                    >mdi-folder-plus</v-icon>
                    Add Folder
                  </v-btn>

                </div>
                <v-list-item
                  v-for="(folder, index) in folders"
                  :key="index"
                  class="dragFolders"
                  style="display: flex"
                  @mouseover="dragStops(folder)"
                >
                  <v-list-item-avatar @click="switchFolder(folder.folderKey)">
                    <v-icon color="yellow accent-4">mdi-folder</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content
                    @click="switchFolder(folder.folderKey)"
                    style="word-wrap: break-word"
                  >
                    <v-list-item-title v-html="folder.folderName"></v-list-item-title>
                  </v-list-item-content>

                  <MenuButton
                    :menuAction="menuAction"
                    :actionItem="folder"
                    :eventBus="$eventHub"
                    :menuOption="menuOption"
                  />
                </v-list-item>
              </Draggable>
            </v-list-item-group>
          </v-list>

        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import GlobalMixins from '@/mixins/GlobalMixins';
import StringConstants from '@/constants/StringConstants';
import EventConstants from '@/constants/EventConstants';
import Draggable from 'vuedraggable';
import MenuButton from '@/components/MenuButton.vue';

// const { localStorage } = window;

export default {
  mixins: [GlobalMixins],
  components: {
    Draggable,
    MenuButton,
  },
  data () {
    return {
      tFolder: true,
      folders: [],
      showDialog: false,
      folderName: StringConstants.STRING_EMPTY,
      menuAction: [
        {
          buttonName: StringConstants.RENAME,
          event: EventConstants.RENAME_FOLDER_EVENT,
          icon: 'mdi-rename-box',
          iconColor: 'green lighten-2',
        }, {
          buttonName: StringConstants.DELETE,
          event: EventConstants.DEL_FOLDER_EVENT,
          icon: 'mdi-folder-remove',
          iconColor: 'red lighten-3',
        },
      ],
      menuOption: {
        color: 'grey',
      },
      editFolder: {},
      oldFolder: {},
      initialLoad: false,
      folderHeader: StringConstants.STRING_EMPTY,
    };
  },
  computed: {

  },
  created () {
    this.$eventHub.$on(EventConstants.TOGGLE_FOLDER_EVENT, this.toggleFolder);
    this.$eventHub.$on(EventConstants.ADD_FOLDER_EVENT, this.addFolder);
    this.$eventHub.$on(EventConstants.RENAME_FOLDER_EVENT, this.renameFolder);
    this.$eventHub.$on(EventConstants.DEL_FOLDER_EVENT, this.deleteFolder);

    const that = this;
    document.addEventListener(EventConstants.KEYUP_EVENT, (evt) => {
      if (evt.keyCode === EventConstants.KEYBOARD_ESCAPE) {
        that.close();
      }

      if (evt.keyCode === EventConstants.KEYBOARD_ENTER) {
        that.saveFolder();
      }
    });

    // localStorage.removeItem(StringConstants.STORAGE_FOLDER_KEYS);
    if (localStorage.getItem(StringConstants.STORAGE_FOLDER_KEYS) == null) {
      this.initialLoad = true;
      this.folderName = StringConstants.FAVOURITES;
      this.saveFolder();
      this.initialLoad = false;
    } else {
      this.folders = JSON.parse(localStorage.getItem(StringConstants.STORAGE_FOLDER_KEYS));
    }
    if (this.folders.length > 0) {
      this.$store.state.currentKey = this.folders[0].folderKey;
    }
  },
  methods: {
    toggleFolder () {
      this.tFolder = !this.tFolder;
      this.$parent.$parent.toggleFolder();
    },
    dragStops (folder) {
      if (this.$store.state != null && this.$store.state.dragging && Object.keys(this.$store.state.draggedItem).length > 0) {
        this.$eventHub.$emit(EventConstants.DRAG_END_EVENT, folder.folderKey);
      }
    },
    addFolder () {
      this.showDialog = true;
      this.folderHeader = StringConstants.ADD_FOLDER;
    },
    folderExist () {
      return this.folders.filter((arr) => arr.folderName === this.folderName).length > 0;
    },
    saveFolder () {
      if (this.showDialog || this.initialLoad) {
        // this.$store.dispatch('addFolder', this.folderName);
        // this.folders.push(this.$store.state.storeItems.filter((arr) => arr.folderName === this.folderName)[0]);
        if (this.folderExist() && !this.onEdit) {
          this.$eventHub.$emit(EventConstants.SHOW_ALERT_EVENT, this.folderName, StringConstants.FOLDER_EXIST_MESSAGE, StringConstants.DELETED_ALERT);
          this.close();
          return;
        }
        const folderKey = this.generateKey(this.folderName);
        if (this.onEdit) {
          const obj = this.folders.filter((arr) => arr.folderKey === this.editKey)[0];
          const newobj = {};
          newobj.folderName = this.folderName;
          newobj.folderKey = folderKey;
          this.folders[this.folders.indexOf(obj)] = newobj;
          this.$eventHub.$emit(EventConstants.SHOW_ALERT_EVENT, this.folderName, StringConstants.FOLDER_EDIT_MESSAGE, StringConstants.SUCCESS_ALERT);
        } else {
          const obj = {};
          obj.folderName = this.folderName;
          obj.folderKey = folderKey;
          this.folders.push(obj);
          if (!this.initialLoad) {
            this.$eventHub.$emit(EventConstants.SHOW_ALERT_EVENT, this.folderName, StringConstants.FOLDER_ADDED_MESSAGE, StringConstants.SUCCESS_ALERT);
          }
          localStorage.setItem(folderKey, StringConstants.STRING_EMPTY);
        }
        localStorage.setItem(StringConstants.STORAGE_FOLDER_KEYS, JSON.stringify(this.folders));

        if (localStorage.getItem(this.editKey) != null) {
          const tempItem = localStorage.getItem(this.editKey);
          localStorage.removeItem(this.editKey);
          localStorage.setItem(folderKey, tempItem);
        }

        if (this.$store.state.currentKey === this.editKey) {
          this.$store.state.currentKey = folderKey;
        }
        this.close();
      }
    },
    close () {
      this.showDialog = false;
      this.folderName = StringConstants.STRING_EMPTY;
      this.editKey = StringConstants.STRING_EMPTY;
      this.onEdit = false;
      this.oldFolder = {};
    },
    switchFolder (folderKey) {
      this.$store.state.currentKey = folderKey;
      this.$eventHub.$emit(EventConstants.UPDATE_ITEMS_EVENT, folderKey);
    },
    generateKey (key) {
      // Not required any more - Limited implementation to 1 per name
      if (key.indexOf('KEY_') === -1) {
        key = `KEY_${key.replace(' ', '_')}_ID_000`;
        if (localStorage.getItem(key) == null) {
          return key;
        }
      }
      const id = key.split('_ID_');
      let number = parseInt(id[1], 10);
      return `${id[0]}${number++}`;
    },
    renameFolder (editFolder) {
      this.folderName = editFolder.folderName;
      this.showDialog = true;
      this.onEdit = true;
      this.editKey = editFolder.folderKey;
      this.folderHeader = StringConstants.RENAME_FOLDER;
    },
    deleteFolder (folder) {
      if (this.folders.length > 1) {
        const { folderName } = folder;
        const { folderKey } = folder;
        this.folders.splice(this.folders.indexOf(folder), 1);
        localStorage.setItem(StringConstants.STORAGE_FOLDER_KEYS, JSON.stringify(this.folders));

        if (localStorage.getItem(folder.folderKey) != null) {
          localStorage.removeItem(folder.folderKey);
        }
        this.$eventHub.$emit(EventConstants.SHOW_ALERT_EVENT, folderName, StringConstants.FOLDER_DEL_MESSAGE, StringConstants.DELETED_ALERT);
        if (this.$store.state.currentKey === folderKey) {
          this.$store.state.currentKey = this.folders[0].folderKey;
          this.switchFolder(this.$store.state.currentKey);
        }
      } else {
        this.$eventHub.$emit(EventConstants.SHOW_ALERT_EVENT, StringConstants.STRING_EMPTY, StringConstants.FOLDER_LAST_MESSAGE, StringConstants.DELETED_ALERT);
      }
    },
    onEnd () {
      localStorage.setItem(StringConstants.STORAGE_FOLDER_KEYS, JSON.stringify(this.folders));
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

.folderContent {
  display: block;
  padding-top: 5%;
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

.height100 {
  top: 0;
  height: 100vh;
  position: relative;
}

.padding8 {
  padding-top: 4.1%;
  border-right: 0.5px ridge white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
}
</style>

<style lang="sass">
  $color-pack: false

@import '~vuetify/src/styles/main.sass'
</style>
