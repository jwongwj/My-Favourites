<template>
  <v-app>
    <div @contextmenu.prevent="">
      <Navbar />
      <template>
        <v-row justify="center">
          <v-dialog
            v-model="showDialog"
            max-width="600px"
          >
            <v-card>
              <v-card-title>
                <span class="headline">Add Folder</span>
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
                  @click="save()"
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
            class="mainContent width30 height100 padding8"
          >
            <v-list>
              <v-list-item-group>
                <Draggable
                  v-model="folders"
                  @dragend="log"
                  draggable=".dragFolders"
                  group="dragFolders"
                >
                  <v-list-item
                    v-for="(folder, index) in folders"
                    :key="index"
                    class="dragFolders"
                    style="display: flex"
                  >
                    <v-list-item-avatar @click="switchFolder(folder.folderKey)">
                      <v-icon>mdi-folder</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content @click="switchFolder(folder.folderKey)">
                      <v-list-item-title v-html="folder.folderName"></v-list-item-title>
                    </v-list-item-content>

                    <MenuButton
                      :menuAction="menuAction"
                      :actionItem="folder"
                      :eventBus="$eventHub"
                    />
                  </v-list-item>
                </Draggable>
              </v-list-item-group>
            </v-list>

          </div>
        </transition>
        <div :class="mainContentDiv">
          <Main />
        </div>
        <div style="position: absolute; bottom: 0; width: 100%; display: block">
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
      </div>
    </div>
  </v-app>
</template>

<script>
import GlobalMixins from '@/mixins/GlobalMixins';
import Navbar from '@/components/Navbar.vue';
import Main from '@/components/Main.vue';
import StringConstants from '@/constants/StringConstants';
import EventConstants from '@/constants/EventConstants';
import Draggable from 'vuedraggable';
import MenuButton from '@/components/MenuButton.vue';

// const { localStorage } = window;

export default {
  mixins: [GlobalMixins],
  components: {
    Navbar,
    Main,
    Draggable,
    MenuButton,
  },
  data () {
    return {
      alert: false,
      alertMessage: StringConstants.STRING_EMPTY,
      alertType: 'success',
      eventMessage: StringConstants.STRING_EMPTY,
      tFolder: true,
      folders: [],
      showDialog: false,
      folderName: StringConstants.STRING_EMPTY,
      menuAction: [
        {
          buttonName: StringConstants.EDIT,
          event: 'renameFolder',
          icon: 'mdi-pencil',
        }, {
          buttonName: StringConstants.DELETE,
          event: 'deleteFolder',
          icon: 'mdi-delete-variant',
        },
      ],
      editFolder: {},
      oldFolder: {},
      initialLoad: false,
    };
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
    mainContentDiv () {
      return {
        mainContent: true,
        width70: this.tFolder,
        width100: !this.tFolder,
      };
    },
  },
  created () {
    this.$eventHub.$on(EventConstants.TOGGLE_FOLDER_EVENT, this.toggleFolder);
    this.$eventHub.$on(EventConstants.ADD_FOLDER_EVENT, this.addFolder);
    this.$eventHub.$on('renameFolder', this.renameFolder);
    this.$eventHub.$on('deleteFolder', this.deleteFolder);

    const that = this;
    document.addEventListener(EventConstants.KEYUP_EVENT, (evt) => {
      if (evt.keyCode === EventConstants.KEYBOARD_ESCAPE) {
        that.close();
      }

      if (evt.keyCode === EventConstants.KEYBOARD_ENTER) {
        that.save();
      }
    });

    // localStorage.removeItem('keysForFolders');
    if (localStorage.getItem('keysForFolders') == null) {
      this.initialLoad = true;
      this.folderName = 'Favourites';
      this.save();
      this.initialLoad = false;
    } else {
      this.folders = JSON.parse(localStorage.getItem('keysForFolders'));
    }
    if (this.folders.length > 0) {
      this.$store.state.currentKey = this.folders[0].folderKey;
    }
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
    toggleFolder () {
      this.tFolder = !this.tFolder;
    },
    log () {
      // eslint-disable-next-line prefer-rest-params
      console.log(arguments);
    },
    addFolder () {
      this.showDialog = true;
    },
    folderExist () {
      return this.folders.filter((arr) => arr.folderName === this.folderName).length > 0;
    },
    save () {
      if (this.showDialog || this.initialLoad) {
        // this.$store.dispatch('addFolder', this.folderName);
        // this.folders.push(this.$store.state.storeItems.filter((arr) => arr.folderName === this.folderName)[0]);
        if (this.folderExist() && !this.onEdit) {
          this.showAlert(this.folderName, ' folder already exist', StringConstants.DELETED_ALERT);
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
          this.showAlert(this.folderName, ' folder has been edited', StringConstants.SUCCESS_ALERT);
        } else {
          const obj = {};
          obj.folderName = this.folderName;
          obj.folderKey = folderKey;
          this.folders.push(obj);
          if (!this.initialLoad) {
            this.showAlert(this.folderName, ' folder has been added', StringConstants.SUCCESS_ALERT);
          }
        }
        localStorage.setItem('keysForFolders', JSON.stringify(this.folders));

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
      this.$eventHub.$emit('updateItems', folderKey);
    },
    generateKey (key) {
      if (key.indexOf('KEY_') === -1) {
        key = `KEY_${key.replace(' ', '_')}_ID_000`;
        if (localStorage.getItem(key) == null) {
          return key;
        }
      }
      const id = key.split('_ID_');
      const number = parseInt(id[1], 10);
      return `${id[0]}${number}`;
    },
    renameFolder (editFolder) {
      this.folderName = editFolder.folderName;
      this.showDialog = true;
      this.onEdit = true;
      this.editKey = editFolder.folderKey;
    },
    deleteFolder (folder) {
      if (this.folders.length > 1) {
        this.folders.splice(this.folders.indexOf(folder), 1);
        localStorage.setItem('keysForFolders', JSON.stringify(this.folders));

        if (localStorage.getItem(folder.folderKey) != null) {
          localStorage.removeItem(folder.folderKey);
        }
      } else {
        this.showAlert('', 'At least one folder needs to remain', StringConstants.DELETED_ALERT);
      }
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

.height100 {
  top: 0;
  height: 100vh;
  position: relative;
}

.padding8 {
  padding-top: 5%;
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
