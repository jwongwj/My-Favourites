import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    AddNew: 'Add New',
    Edit: 'Edit',
    DeleteAll: 'Delete All',
    DeleteRow: 'Delete Row',
    DeleteSelected: 'Delete Selected',
    Save: 'Save',
  },
  mutations: {},
  actions: {},
  modules: {},
});
