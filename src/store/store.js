import Vue from 'vue';
import Vuex from 'vuex';
import ListModel from '@/model/ListModel';
import StringConstants from '@/constants/StringConstants';

Vue.use(Vuex);

const ADD_FOLDER = 'ADD_FOLDER';

export default new Vuex.Store({
  state: {
    storeItems: [],
    storeItem: new ListModel(),
    currentKey: StringConstants.STRING_EMPTY,
  },
  getters: {
    // eslint-disable-next-line no-unused-vars
    getCurrentKey: (state) => {
      const { localStorage } = window;
      const folder = JSON.parse(localStorage.getItem('keysForFolders'));
      if (folder != null) {
        const fold = folder.filter((arr) => arr.folderKey === state.currentKey);
        if (fold != null) {
          return fold[0].folderName;
        }
      }

      return '';
    },
  },
  mutations: {
    [ADD_FOLDER](state, folderName) {
      const obj = {};
      obj.folderName = folderName;
      obj.items = {
        name: StringConstants.STRING_EMPTY,
        url: StringConstants.STRING_EMPTY,
        description: StringConstants.STRING_EMPTY,
        checked: false,
        files: [],
      };
      state.storeItems.push(obj);
    },
  },
  actions: {
    addFolder({ commit }, folderName) {
      commit(ADD_FOLDER, folderName);
    },
  },
  modules: {},
});
