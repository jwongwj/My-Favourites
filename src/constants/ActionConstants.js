import EventConstant from '@/constants/EventConstants';

const MENU_ACTION = 'menuItems';
const LIST_ACTION = 'listItems';

const ActionItems = {
  menuItems: [
    {
      buttonName: 'Add New Favourites',
      event: EventConstant.ADD_FAVE_EVENT,
      icon: 'mdi-heart',
    },
    {
      buttonName: 'Delete All',
      event: EventConstant.DEL_ALL_EVENT,
      icon: 'mdi-delete-variant',
    },
  ],
  listItems: [
    {
      buttonName: 'Edit',
      event: EventConstant.EDIT_FAVE_EVENT,
      icon: 'mdi-pencil',
    },
    {
      buttonName: 'Delete',
      event: EventConstant.DEL_FAVE_EVENT,
      icon: 'mdi-delete-variant',
    },
    {
      buttonName: 'Open URL',
      event: EventConstant.OPEN_URL_EVENT,
      icon: 'mdi-arrow-top-left-bold-outline',
    },
  ],
};

export default {
  ActionItems,
  MENU_ACTION,
  LIST_ACTION,
};
