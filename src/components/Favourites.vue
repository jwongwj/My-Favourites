<template>
  <div class="favourites">
    <!-- <div class="headerDiv">
      a
    </div> -->
    <div>
      <AddButton
        :edit="false"
        :keyIndex="indexLength()"
      />
      <DeleteButton
        :deleteAll="true"
        :msg="globalConstant().DeleteAll"
      />

      <table>
        <tr>
          <th></th>
          <th>Icon</th>
          <th>Name</th>
          <th>Url</th>
          <th>Description</th>
          <th></th>
        </tr>
        <tr
          :key="index"
          v-for="(list, index) in linkList"
        >

          <td><input
              type="checkbox"
              v-model="list.linkObj.checked"
              @click="selected(index)"
            /></td>
          <td>{{list.linkObj.iconPath}}</td>
          <td>{{list.linkObj.name}}</td>
          <td>{{ list.linkObj.url}}</td>
          <td>{{ list.linkObj.description  }}</td>
          <td>
            <AddButton
              :edit="true"
              :keyIndex="index"
            />
            <DeleteButton
              :removeIndex="index"
              :msg="globalConstant().DeleteRow"
            />
          </td>

        </tr>

        <DeleteButton
          :deleteSelected="true"
          :msg="globalConstant().DeleteSelected"
        />
      </table>
    </div>
  </div>
</template>

<script>
import AddButton from '@/components/Add.vue';
import DeleteButton from '@/components/Delete.vue';
import store from '@/store/index';

export default {
  name: 'Favourites',
  data () {
    return {
      linkList: [],
      selectedList: [],
    };
  },
  props: {
    msg: String,
  },
  components: {
    AddButton,
    DeleteButton,
  },
  methods: {
    indexLength () {
      return this.linkList.length;
    },
    selected (index) {
      if (this.selectedList.includes(index)) {
        const indx = this.selectedList.indexOf(index);
        if (indx !== -1) this.selectedList.splice(indx, 1);
      } else {
        this.selectedList.push(index);
      }
      console.log(this.selectedList);
    },
    globalConstant () {
      return store.state;
    },
  },
  destroyed () {
    console.log('destroyed favourites');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.headerDiv {
  background-color: red;
  margin: 0;
}

table {
  table-layout: fixed;
  text-align: center;
}

td {
  width: 7%;
}

th {
  width: 7%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
