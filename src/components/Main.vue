<template>
  <v-sheet
    id="scrolling-techniques-7"
    max-height="90vh"
  >
    <v-container @contextmenu.prevent="">
      <template>
        <v-row justify="center">
          <v-dialog
            v-model="showDialog"
            max-width="600px"
          >
            <v-card>
              <v-card-title>
                <span class="headline">Bookmarks</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form
                    ref="listForm"
                    v-model="valid"
                  >
                    <v-row>
                      <v-col
                        cols="2"
                        sm="4"
                        md="2"
                      >
                        <img
                          :src="getImage(item.url)"
                          class="icon"
                        />
                      </v-col>
                      <v-col
                        cols="10"
                        sm="8"
                        md="10"
                      >
                        <v-text-field
                          label="Url *"
                          v-model="item.url"
                          :v-value="item.url"
                          placeholder="https://www."
                          :rules="urlRule"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Name"
                          v-model="item.name"
                          :v-value="item.name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Description"
                          v-model="item.description"
                          :v-value="item.description"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                  <small>* Required Fields</small>
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
      <v-row style="padding-top: 5%;">
        <v-card
          max-width="800"
          width="60vw"
          height="89vh"
          tile
          class="mx-auto overflow-y-auto listClass"
        >
          <v-toolbar
            flat
            v-if="!checkItems()"
          >
            <v-text-field
              label="Search"
              append-icon="mdi-magnify"
              v-model="search"
              style="padding-top: 5vh;"
            ></v-text-field>
          </v-toolbar>
          <v-list
            dense
            two-line
            shaped
            avatar
            rounded
          >
            <v-list-item-group>
              <div
                class="alignCenter"
                v-if="checkItems()"
              >
                <span> No data available </span>
              </div>
              <div v-else>
                <!-- <draggable
                  v-model="items"
                  :move="onMove"
                > -->
                <v-list-item
                  v-for="(itemList, i) in filteredList"
                  :key="i"
                  @click="navigateURL(itemList)"
                >

                  <v-list-item-avatar>
                    <v-img :src="getImage(itemList.url)"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-html="itemList.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="itemList.description"></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <MenuButton
                      :menuAction="menuAction"
                      :actionItem="itemList"
                      :menuOption="menuOption"
                      :eventBus="$eventHub"
                    />
                  </v-list-item-action>

                </v-list-item>
                <!-- </draggable> -->
              </div>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import GlobalMixins from '@/mixins/GlobalMixins';
import EventConstants from '@/constants/EventConstants';
import MenuButton from '@/components/MenuButton.vue';
import ListModel from '@/model/ListModel';
import StringConstants from '../constants/StringConstants';
// import draggable from 'vuedraggable';

const { localStorage } = window;
const storageKey = StringConstants.STORAGE_ITEMS_KEY;

export default {
  name: 'formDiv',
  mixins: [GlobalMixins],
  components: {
    MenuButton,
    // draggable,
  },
  data () {
    return {
      item: new ListModel(),
      items: [],
      menuAction: [
        {
          buttonName: StringConstants.EDIT,
          event: EventConstants.EDIT_FAVE_EVENT,
          icon: 'mdi-pencil',
        },
        {
          buttonName: StringConstants.DELETE,
          event: EventConstants.DEL_FAVE_EVENT,
          icon: 'mdi-delete-variant',
        },
        {
          buttonName: StringConstants.OPEN_URL,
          event: EventConstants.OPEN_URL_EVENT,
          icon: 'mdi-arrow-top-left-bold-outline',
        },
      ],
      oldItem: new ListModel(),
      onEdit: false,
      menuOption: {
        color: 'grey',
      },
      revert: false,
      search: StringConstants.STRING_EMPTY,
      showDialog: false,
      urlRule: [
        (v) => (v !== undefined) || StringConstants.BLANK_VALIDATION('URL'),
        (v) => (v !== StringConstants.STRING_EMPTY) || StringConstants.BLANK_VALIDATION('URL'),
      ],
      valid: false,
      value: false,
    };
  },
  created () {
    // Register Events
    this.$eventHub.$on(EventConstants.DEL_FAVE_EVENT, this.delFave);
    this.$eventHub.$on(EventConstants.EDIT_FAVE_EVENT, this.editFave);
    this.$eventHub.$on(EventConstants.OPEN_URL_EVENT, this.navigateURL);
    this.$eventHub.$on(EventConstants.ADD_FAVE_EVENT, this.addFave);
    this.$eventHub.$on(EventConstants.DEL_ALL_EVENT, this.delAll);
    // End Register Events

    if (localStorage.getItem(storageKey) !== null) {
      this.items = JSON.parse(localStorage.getItem(storageKey));
    }
  },
  methods: {
    addFave () {
      this.showDialog = true;
      if (this.$refs.listForm) {
        this.$refs.listForm.reset();
      }
    },
    checkItems () {
      if (this.items === StringConstants.STRING_EMPTY) {
        return true;
      }
      return this.items.length === 0;
    },
    close () {
      this.item = new ListModel();
      this.showDialog = false;
      this.onEdit = false;
    },
    decodeUrl (url) {
      if (url === StringConstants.STRING_EMPTY || url === undefined) {
        return `${StringConstants.WEB_HTTPS_PREFIX}${StringConstants.WEB_WWW}`;
      }

      let newUrl = window.decodeURIComponent(url);
      newUrl = newUrl.trim().replace(/\s/g, StringConstants.STRING_EMPTY);

      if (/^(:\/\/)/.test(newUrl)) {
        return `${StringConstants.WEB_HTTPS}${newUrl}`;
      }
      if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
        return `${StringConstants.WEB_HTTPS_PREFIX}${newUrl}`;
      }
      return url;
    },
    delAll () {
      localStorage.clear();
      this.items = [];
    },
    delFave (item) {
      const index = this.items.indexOf(item);
      if (index > -1) {
        this.items.splice(index, 1);
      }
      localStorage.setItem(storageKey, JSON.stringify(this.items));
    },
    editFave (item) {
      this.oldItem = item;
      this.item = { ...item };
      this.showDialog = true;
      this.onEdit = true;
    },
    getImage (url) {
      if (url === StringConstants.STRING_EMPTY) {
        url = this.decodeUrl(url);
      }

      return `${StringConstants.FAVEICON_PATH}${url}`;
    },
    navigateURL (item) {
      let { url } = item;
      url = this.decodeUrl(url);
      window.open(url);
    },
    save () {
      if (this.showDialog) {
        if (this.item.url !== StringConstants.STRING_EMPTY && this.item.url !== undefined) {
          if (this.onEdit === false) {
            this.items.push(this.item);
          } else {
            const index = this.items.indexOf(this.oldItem);
            if (index > -1) {
              // My issue here
              this.$set(this.items, index, this.item);
            }
          }
          localStorage.setItem(storageKey, JSON.stringify(this.items));
          this.close();
        } else {
          this.$refs.listForm.validate(false, this.item.url);
        }
      }
    },
  },
  computed: {
    filteredList () {
      const { search } = this;
      return this.items.filter((i) => {
        if (i == null) {
          return;
        }
        let { url } = i;
        if (url != null) {
          url = url.replace(StringConstants.WEB_HTTPS_PREFIX, StringConstants.STRING_EMPTY);
          url = url.replace(StringConstants.WEB_HTTPS, StringConstants.STRING_EMPTY);
        }
        return (
          (url != null
            && url.toLowerCase().includes(search.toLowerCase()))
          || (i.name != null
            && i.name.toLowerCase().includes(search.toLowerCase()))
          || (i.description != null
            && i.description.toLowerCase().includes(search.toLowerCase()))
        );
      });
    },
  },
};
</script>

<style>
.alignCenter {
  text-align: center;
}
.icon {
  height: inherit;
  width: inherit;
  border-radius: 50%;
}

/* width */
.listClass::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.listClass::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 5px;
}

/* Handle */
.listClass::-webkit-scrollbar-thumb {
  background: grey;
  border-radius: 10px;
}
</style>
