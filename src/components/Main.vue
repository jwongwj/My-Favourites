<template>
  <v-sheet
    id="scrolling-techniques-7"
    max-height="90vh"
    style="position: relative;"
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
      <v-row
        style="padding-top: 4%;"
        class="minClassSize"
      >
        <v-card
          tile
          class="mx-auto overflow-y-auto listClass"
        >
          <v-toolbar
            flat
            v-if="!checkItems()"
          >

            <v-btn
              color="blue darken-1"
              text
              class="sortableMenu"
              v-if="sortable"
              @click="sortable = !sortable"
            >Done</v-btn>
            <div
              v-else-if="multiSelect"
              style="display: flex; width: 100%"
            >
              <v-btn
                color="red darken-1"
                text
                @click="deleteSelected"
              >Delete Selected</v-btn>
              <v-btn
                color="red darken-1"
                text
                class="sortableMenu"
                @click="toggleMultiselect"
              >X</v-btn>
            </div>
            <v-text-field
              v-else
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
                <Draggable
                  v-model="items"
                  @end="onEnd"
                  draggable=".dragItems"
                >
                  <v-list-item
                    v-for="(itemList, i) in filteredList"
                    :key="i"
                    :class="{dragItems : true}"
                    selectable
                    v-longpress
                    :ripple="false"
                  >
                    <v-list-item-action
                      v-if="multiSelect"
                      @click="selectItem(itemList)"
                    >
                      <!-- Checkbox :checked is actually input-value -->
                      <v-checkbox :input-value="itemList.checked"></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-avatar
                      :class="{dragItems : true}"
                      @click="setMultiSelect(itemList)"
                    >
                      <v-img :src="getImage(itemList.url)"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content
                      @click="navigateURL(itemList)"
                      :class="{dragItems : true, leftMargin: sortable || multiSelect}"
                    >
                      <v-list-item-title v-html="itemList.name"></v-list-item-title>
                      <v-list-item-subtitle v-html="itemList.description"></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action
                      v-if="sortable"
                      :class="{dragItems : false}"
                    >
                      <v-tooltip right>
                        <template v-slot:activator="{ on }">
                          <v-icon v-on='on'> mdi-menu </v-icon>
                        </template>
                        <span>Sort Order</span>
                      </v-tooltip>

                    </v-list-item-action>
                    <v-list-item-action
                      v-else-if="!multiSelect"
                      :class="{ dragItems : true}"
                    >
                      <MenuButton
                        :menuAction="menuAction"
                        :actionItem="itemList"
                        :menuOption="menuOption"
                        :eventBus="$eventHub"
                      />
                    </v-list-item-action>

                  </v-list-item>
                </Draggable>
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
import Draggable from 'vuedraggable';
import StringConstants from '@/constants/StringConstants';

const { localStorage } = window;
const storageKey = StringConstants.STORAGE_ITEMS_KEY;

export default {
  name: 'formDiv',
  mixins: [GlobalMixins],
  components: {
    MenuButton,
    Draggable,
  },
  data () {
    return {
      alert: true,
      item: new ListModel(),
      items: [],
      menuAction: [
        {
          buttonName: StringConstants.EDIT,
          event: EventConstants.EDIT_FAVE_EVENT,
          icon: 'mdi-pencil',
        },
        {
          buttonName: StringConstants.MOVE,
          event: EventConstants.SORT_EVENT,
          icon: 'mdi-menu',
        },
        {
          buttonName: StringConstants.DELETE,
          event: EventConstants.DEL_FAVE_EVENT,
          icon: 'mdi-delete-variant',
        },
      ],
      oldItem: new ListModel(),
      onEdit: false,
      multiSelect: false,
      menuOption: {
        color: 'grey',
      },
      navigate: true,
      revert: false,
      search: StringConstants.STRING_EMPTY,
      selectedCount: 0,
      selectedItems: [],
      showDialog: false,
      sortable: false,
      urlRule: [
        (v) => (this.checkExist(v)) || StringConstants.BLANK_VALIDATION('URL'),
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
    this.$eventHub.$on(EventConstants.SORT_EVENT, this.setSortable);

    const that = this;

    document.addEventListener(EventConstants.KEYUP_EVENT, (evt) => {
      if (evt.keyCode === EventConstants.KEYBOARD_ESCAPE) {
        that.close();
      }

      if (evt.keyCode === EventConstants.KEYBOARD_ENTER) {
        that.save();
      }
    });
    // End Register Events

    if (localStorage.getItem(storageKey) !== null) {
      this.items = JSON.parse(localStorage.getItem(storageKey));
    }
  },
  methods: {
    addFave () {
      this.showDialog = true;
      this.onEdit = false;
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
      this.sortable = false;
      this.multiSelect = false;
      this.uncheckAllItems(this.selectedItems);
      this.selectedItems = [];
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
      const { length } = this.items;
      if (length > 0) {
        const itemMsg = (length > 1) ? `${length} ${StringConstants.ITEMS}` : `${length} ${StringConstants.ITEM}`;
        const delMsg = (length > 1) ? `${length} ${StringConstants.DELETED_ALL_MESSAGE}` : `${length} ${StringConstants.DELETED_SINGLE_MESSAGE}`;
        localStorage.removeItem(StringConstants.STORAGE_ITEMS_KEY);
        this.items = [];
        this.getMainContext().showAlert(itemMsg, delMsg, StringConstants.DELETED_ALERT);
      }
    },
    delFave (item) {
      const index = this.items.indexOf(item);
      if (index > -1) {
        const { name } = this.items[index];
        this.items.splice(index, 1);
        this.saveToLocalStorage();
        this.getMainContext().showAlert(name, StringConstants.DELETED_SINGLE_MESSAGE, StringConstants.DELETED_ALERT);
      }
    },
    deleteSelected () {
      const { length } = this.selectedItems;
      if (length > 0) {
        const message = (length > 1) ? `${length} ${StringConstants.ITEMS}` : `${length} ${StringConstants.ITEM}`;
        const delMsg = (length > 1) ? `${length} ${StringConstants.DELETED_ALL_MESSAGE}` : `${length} ${StringConstants.DELETED_SINGLE_MESSAGE}`;
        for (let i = 0; i < this.selectedItems.length; i++) {
          this.delFave(this.selectedItems[i]);
        }
        debugger;
        this.getMainContext().showAlert(message, delMsg, StringConstants.DELETED_ALERT);
        this.toggleMultiselect();
      }
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
    getMainContext () {
      return this.$parent.$parent;
    },
    navigateURL (item) {
      if (this.navigate) {
        let { url } = item;
        url = this.decodeUrl(url);
        window.open(url);
        this.navigate = true;
      }
    },
    save () {
      if (this.showDialog) {
        if (this.checkExist(this.item.url)) {
          this.item.checked = false;
          const action = this.onEdit ? StringConstants.EDITED_MESSAGE : StringConstants.ADDED_MESSAGE;

          if (this.onEdit === false) {
            this.items.push(this.item);
          } else {
            const index = this.items.indexOf(this.oldItem);
            if (index > -1) {
              // My issue here
              this.$set(this.items, index, this.item);
            }
          }
          const { name } = this.item;
          this.saveToLocalStorage();
          this.close();

          this.getMainContext().showAlert(name, action, StringConstants.SUCCESS_ALERT);
        } else {
          this.$refs.listForm.validate(false, this.item.url);
        }
      }
    },
    saveToLocalStorage () {
      localStorage.setItem(storageKey, JSON.stringify(this.items));
    },
    selectItem (item) {
      const indexMainList = this.items.indexOf(item);
      if (indexMainList > -1) {
        item.checked = !item.checked;
        this.$set(this.items, indexMainList, item);
      }

      const index = this.selectedItems.indexOf(item);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      } else {
        this.selectedItems.push(item);
      }
      this.selectedCount = this.selectedItems.length;
    },
    setMultiSelect (item) {
      if (!this.sortable) {
        this.multiSelect = true;
        this.navigate = false;

        if (this.checkExist(item)) {
          this.selectItem(item);
        }
      }
    },
    setSortable () {
      this.sortable = !this.sortable;
    },
    toggleMultiselect () {
      this.multiSelect = false;
      this.navigate = true;
      this.uncheckAllItems(this.selectedItems);
      this.selectedItems = [];
    },
    onEnd () {
      this.saveToLocalStorage();
    },
    uncheckAllItems (selected) {
      for (let i = 0; i < selected.length; i++) {
        const index = this.items.indexOf(selected[i]);
        if (index > -1) {
          const item = this.items[index];
          item.checked = false;
          this.$set(this.items, index, item);
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
  directives: {
    longpress: {
      bind (el, binding, vNode) {
        // Source: https://blog.logrocket.com/building-a-long-press-directive-in-vue-3408d60fb511/

        // Define variable
        let pressTimer = null;

        // Cancel Timeout
        const cancel = () => {
          // Check if timer has a value or not
          if (pressTimer !== null) {
            clearTimeout(pressTimer);
            pressTimer = null;
          }
        };

        // Define funtion handlers
        // Create timeout ( run function after 1s )
        const start = (e) => {
          if (e.type === EventConstants.CLICK_EVENT && e.button !== 0) {
            return;
          }

          if (pressTimer === null) {
            pressTimer = setTimeout(() => {
              // Run function
              vNode.context.setMultiSelect();
            }, 1000);
          }
        };

        // Add Event listeners
        el.addEventListener(EventConstants.MOUSEDOWN_EVENT, start);
        el.addEventListener(EventConstants.TOUCHSTART_EVENT, start);
        // Cancel timeouts if this events happen
        el.addEventListener(EventConstants.CLICK_EVENT, cancel);
        el.addEventListener(EventConstants.MOUSEOUT_EVENT, cancel);
        el.addEventListener(EventConstants.TOUCHEND_EVENT, cancel);
        el.addEventListener(EventConstants.TOUCHCANCEL_EVENT, cancel);
      },
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

.listClass {
  max-width: 800px;
  width: 60vw;
  height: 89vh;
  overflow-x: hidden;
}

.leftMargin {
  margin-left: 2vw;
}

.sortableMenu {
  margin-left: auto;
  margin-right: 0;
  display: block;
}

@media only screen and (max-width: 800px) {
  .listClass {
    padding-top: 2vh;
    width: 100%;
    height: 94vh;
  }
}
</style>
