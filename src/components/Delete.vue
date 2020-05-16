<template>
  <div>
    <button @click="remove">{{ msg }}</button>
  </div>
</template>

<script>
export default {
  name: 'delete',
  props: {
    removeIndex: Number,
    deleteAll: Boolean,
    deleteSelected: Boolean,
    msg: String,
  },
  methods: {
    // TODO: Perhaps refactor with VueX when more familiar

    remove () {
      if (this.$parent.linkList === undefined || this.$parent.selectedList === undefined) {
        return;
        // Not sure whats the best approach, but this is to define that it can only be used when this 2 list exist
        // (Specifying how to be able to use this method)
      }
      if (this.deleteSelected) { // Delete from list
        for (let i = this.$parent.linkList.length - 1; i >= 0; i--) {
          for (let j = 0; j < this.$parent.selectedList.length; j++) {
            if (this.$parent.selectedList[j] === i) {
              this.removeRow(this.$parent.selectedList[j]);
            }
          }
        }
      } else if (this.deleteAll) { // Delete All - reset both selected and list
        this.$parent.linkList = [];
        this.$parent.selectedList = [];
      } else { // Delete at rows
        this.removeRow(this.removeIndex);
      }
    },
    removeRow (index) {
      // 1. untick checkbox
      // 2. remove at index
      // 3. remove if exist in selected list
      if (this.$parent.linkList[index] === undefined) {
        return;
      }

      this.$parent.linkList[index].checked = false;
      this.$parent.linkList.splice(index, 1);
      if (this.$parent.selected !== undefined && this.$parent.selected.length > 0) {
        if (this.$parent.selectedList.indexOf(index) > -1) {
          this.$parent.selected(index);
        }
      }
    },
  },
};
</script>

<style>
</style>
