<template>
  <div>
    <button @click="showHide">{{getButtonText()}}</button>
    <Form
      :edit="edit"
      :showModal="showModal"
    />

  </div>
</template>

<script>
// @ is an alias to /src
import Form from '@/components/Form.vue';
import store from '@/store/index';

const GlobalConstant = store.state;
export default {
  name: 'addbutton',
  data () {
    return {
      showModal: false,
    };
  },
  props: {
    keyIndex: Number,
    edit: Boolean,
  },
  components: {
    Form,
  },
  methods: {
    showHide () {
      this.showModal = !this.showModal;
    },
    addNew (name, url, iconPath, description) {
      const { keyIndex } = this;
      const checked = false;
      const order = 0;
      const linkObj = {
        name,
        url,
        iconPath,
        description,
        order,
        checked,
      };

      this.$parent.linkList.push({ keyIndex, linkObj });
    },
    editLinkObject (name, url, iconPath, description) {
      const { keyIndex } = this;
      const parentLinkObject = this.$parent.linkList[keyIndex].linkObj;
      parentLinkObject.name = name;
      parentLinkObject.url = url;
      parentLinkObject.iconPath = iconPath;
      parentLinkObject.description = description;

      this.$parent.linkList[keyIndex].linkObj = parentLinkObject;
    },
    getLinkObject () {
      const index = this.keyIndex;
      if (index >= this.$parent.linkList.length) {
        const linkObj = {
          name: '',
          url: '',
          iconPath: '',
          description: '',
          order: '',
          checked: false,
        };
        return linkObj;
      }

      return this.$parent.linkList[index].linkObj;
    },
    getButtonText () {
      if (this.edit) {
        return GlobalConstant.Edit;
      }

      return GlobalConstant.AddNew;
    },
    triggerAlertDialog (message) {
      alert(message);
    },
  },
};
</script>

<style>
</style>
