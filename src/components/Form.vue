<template>
  <div v-show="showModal">
    <div
      v-bind:class="{ 'modal': true, 'modal-hide': showModal }"
      @click="close"
    >
      <div
        class="modal-content"
        @click.stop
      >
        <span
          class="close-btn"
          @click="close"
        >&times;</span>
        <div class="formFormat">
          <div class="full">
            <label class="label">Name</label>
            <input
              class="fullWidth"
              type="text"
              :v-value="faveName"
              v-model="faveName"
            />
          </div>
          <div class="full">
            <label class="label">URL</label>
            <input
              class="fullWidth"
              type="text"
              :v-value="faveUrl"
              v-model="faveUrl"
            />
          </div>
          <div class="full">
            <label class="label">Icon URL</label>
            <img
              class="icon"
              :src="faveIconPath"
              alt=""
            >
            <input
              class="iconPathClass"
              type="text"
              :v-value="faveIconPath"
              v-model="faveIconPath"
            />

          </div>
          <div class="full">
            <label class="label">Description</label>
            <input
              class="fullWidth"
              type="text"
              :v-value="faveDescription"
              v-model="faveDescription"
            />
          </div>
        </div>
        <button @click="add(faveName, faveUrl, faveIconPath, faveDescription)">{{btnMsg}}</button>
      </div>

    </div>
  </div>
</template>

<script>
import closeMixin from '@/mixins/close';
import store from '@/store/index';

const GlobalConstant = store.state;

export default {
  name: 'formDiv',
  mixins: [closeMixin],
  updated () {
    if (this.edit === true) {
      if (this.edited === false) {
        const linkObj = this.$parent.getLinkObject();
        this.faveName = linkObj.name;
        this.faveUrl = linkObj.url;
        this.faveIconPath = linkObj.iconPath;
        this.faveDescription = linkObj.description;
        this.btnMsg = GlobalConstant.Save;
      }
      this.edited = true;
    }
  },
  data () {
    return {
      displayModal: true,
      faveName: '',
      faveUrl: '',
      faveIconPath: '',
      faveDescription: '',
      faveDivList: [],
      edited: false,
      btnMsg: GlobalConstant.AddNew,
    };
  },
  props: {
    name: String,
    url: String,
    iconPath: String,
    description: String,
    order: String,
    showModal: Boolean,
    edit: Boolean,
    keyIndex: Number,
  },
  methods: {
    add (faveName, faveUrl, faveIconPath, faveDescription) {
      if (this.edit === true) {
        this.$parent.editLinkObject(faveName, faveUrl, faveIconPath, faveDescription);
      } else {
        this.$parent.addNew(faveName, faveUrl, faveIconPath, faveDescription);
      }

      this.close();
    },
    close () {
      this.faveName = '';
      this.faveUrl = '';
      this.faveIconPath = '';
      this.faveDescription = '';
      this.edited = false;
      this.$parent.showModal = false;
    },
  },
};
</script>

<style>
.modal-hide {
  display: none;
}

.modal {
  display: block;
  position: fixed;
  padding-top: 10%;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  position: relative;
  background-color: white;
  padding: 20px;
  margin: auto;
  width: 75%;
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
  border-radius: 25px;
}
.close-btn {
  float: right;
  color: lightgray;
  font-size: 24px;
  font-weight: bold;
  transition-duration: 0.5s;
  transition-property: transform;
}
.close-btn:hover {
  color: red;
  cursor: pointer;
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
}
.formFormat {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.icon {
  width: 8%;
  height: 8%;
}

.iconPathClass {
  width: 80%;
  float: right;
  padding: 12px 20px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.fullWidth {
  width: 80%;
  float: right;
  padding: 12px 20px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.label {
  float: left;
  width: 10%;
  color: grey;
  text-align: justify;
}
.full {
  width: 100%;
  display: inline-block;
  vertical-align: middle;
}
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
</style>
