<template>

  <v-menu offset-y>
    <template
      v-slot:activator="on"
      style="display: none;"
    >
      <v-btn
        icon
        color="primary"
        dark
        v-on="on.on"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list style="display: inline-block;">
      <v-list-item
        v-for="(item, index) in menuItems"
        :key="index"
        @click="executeMenuAction(item.event, actionItemObj)"
        style="display: block;"
      >
        <v-list-item-title>
          <v-list-item-icon>
            <v-icon>
              {{item.icon}}
            </v-icon>
          </v-list-item-icon>
          {{item.buttonName}}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

</template>

<script>
import ActionConstants from '@/constants/ActionConstants';

export default {
  name: 'Navbar',
  props: {
    actionItem: String,
    actionItemObj: Object,
  },
  data () {
    const MENU_ITEMS = ActionConstants.ActionItems[this.actionItem];

    return {
      value: false,
      menuItems: MENU_ITEMS,
    };
  },
  methods: {
    executeMenuAction (event, item) {
      this.$eventHub.$emit(event, item);
    },
  },
};
</script>

<style>
</style>
