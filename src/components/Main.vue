<template>
  <v-sheet
    id="scrolling-techniques-7"
    class="overflow-y-auto"
    max-height="100vh"
  >
    <v-container @contextmenu.prevent="">
      <template style="display: none;">
        <v-row justify="center">
          <v-dialog
            v-model="showDialog"
            persistent
            max-width="600px"
          >
            <v-card>
              <v-card-title>
                <span class="headline">Bookmarks</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="2"
                      sm="4"
                      md="2"
                    >
                      <img
                        :src="setFavImg"
                        class="icon"
                      />
                    </v-col>
                    <v-col
                      cols="10"
                      sm="8"
                      md="10"
                    >
                      <v-text-field
                        label="Url"
                        required
                        v-model="item.url"
                        :v-value="item.url"
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
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red darken-1"
                  text
                  @click="close(true)"
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
      <v-row style="padding-top: 8vh;">
        <v-card
          class="mx-auto"
          max-width="800"
          width="60vw"
          height="89vh"
          tile
        >
          <v-toolbar flat>
            <v-text-field
              label="Search"
              append-icon="mdi-magnify"
              v-model="search"
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
                      :actionItem="menuAction"
                      :actionItemObj="itemList"
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
import closeMixin from '@/mixins/close';
import store from '@/store/index';
import EventConstants from '@/constants/EventConstants';
import MenuButton from '@/components/MenuButton.vue';
import ActionConstants from '@/constants/ActionConstants';
import ListModel from '@/model/ListModel';
// import draggable from 'vuedraggable';

const { localStorage } = window;

const { state } = store;

export default {
  name: 'formDiv',
  mixins: [closeMixin],
  components: {
    MenuButton,
    // draggable,
  },
  data () {
    return {
      value: false,
      menuAction: ActionConstants.LIST_ACTION,
      item: new ListModel(),
      items: [],
      onEdit: false,
      oldItem: new ListModel(),
      search: '',
      activeNames: '',
    };
  },
  methods: {
    checkItems () {
      if (this.items === '') {
        return true;
      }
      return this.items.length === 0;
    },
    delAll () {
      localStorage.clear();
      this.items = [];
    },
    addFave () {
      state.showDialog = true;
    },
    navigateURL (item) {
      window.open(item.url);
    },
    close (revert) {
      if (revert) {
        this.items = this.replaceArray(this.item, this.oldItem, this.items);
      }
      this.item = new ListModel();
      this.oldItem = new ListModel();
      state.showDialog = false;
      this.onEdit = false;
    },
    save () {
      this.item.url = this.decodeUrl(this.item.url);

      if (this.onEdit === false) {
        this.items.push(this.item);
      } else {
        const index = this.items.indexOf(this.oldItem);
        if (index > -1) {
          // My issue here
          this.$set(this.items, index, this.item);
        }
      }
      localStorage.setItem('faveItems', JSON.stringify(this.items));
      this.close(false);
    },
    getImage (url) {
      return `https://s2.googleusercontent.com/s2/favicons?domain=${url}`;
    },
    editFave (item) {
      this.oldItem = item;
      this.item = { ...item };
      state.showDialog = true;
      this.onEdit = true;
    },
    delFave (item) {
      const index = this.items.indexOf(item);
      if (index > -1) {
        this.items.splice(index, 1);
      }
      localStorage.setItem('faveItems', JSON.stringify(this.items));
    },
    decodeUrl (url) {
      if (url === '') {
        return 'www';
      }

      let newUrl = window.decodeURIComponent(url);
      newUrl = newUrl.trim().replace(/\s/g, '');

      if (/^(:\/\/)/.test(newUrl)) {
        return `https${newUrl}`;
      }
      if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
        return `https://${newUrl}`;
      }
      return url;
    },
    replaceArray (oldItem, newItem, array) {
      const index = this.items.indexOf(oldItem);
      if (index > -1) {
        array[index] = newItem;
      }
      return array;
    },
    keyUpEvents (evt) {
      if (evt.keyCode === EventConstants.KEYBOARD_ESCAPE) {
        this.close(true);
      }

      if (evt.keyCode === EventConstants.KEYBOARD_ENTER && state.showDialog) {
        this.save();
      }
    },
  },
  computed: {
    setFavImg () {
      if (this.item.url === '') {
        return '';
      }
      return (
        `https://s2.googleusercontent.com/s2/favicons?domain=${this.item.url}`
      );
    },
    filteredList () {
      const { search } = this;
      return this.items.filter((i) => {
        if (i == null) {
          return;
        }
        return (
          (i.url != null
            && i.url.toLowerCase().includes(search.toLowerCase()))
          || (i.name != null
            && i.name.toLowerCase().includes(search.toLowerCase()))
          || (i.description != null
            && i.description.toLowerCase().includes(search.toLowerCase()))
        );
      });
    },
    showDialog () {
      return state.showDialog;
    },
  },
  created () {
    // Register Events
    this.$eventHub.$on(EventConstants.DEL_FAVE_EVENT, this.delFave);
    this.$eventHub.$on(EventConstants.EDIT_FAVE_EVENT, this.editFave);
    this.$eventHub.$on(EventConstants.OPEN_URL_EVENT, this.navigateURL);
    this.$eventHub.$on(EventConstants.ADD_FAVE_EVENT, this.addFave);
    this.$eventHub.$on(EventConstants.DEL_ALL_EVENT, this.delAll);

    document.addEventListener(EventConstants.KEYUP_EVENT, (evt) => {
      this.keyUpEvents(evt);
    });
    // End Register Events

    if (
      localStorage.getItem('faveItems') !== null
      && localStorage.getItem('faveItems') !== 'undefined'
      && localStorage.getItem('faveItems') !== ''
    ) {
      this.items = JSON.parse(localStorage.getItem('faveItems'));
    }
  },
};
</script>

<style>
.alignCenter {
  text-align: center;
}
</style>
