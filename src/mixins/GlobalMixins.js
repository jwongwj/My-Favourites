import EventConstants from '@/constants/EventConstants';

export default {
  created() {
    const that = this;

    document.addEventListener(EventConstants.KEYUP_EVENT, (evt) => {
      if (evt.keyCode === EventConstants.KEYBOARD_ESCAPE) {
        that.close();
      }

      if (evt.keyCode === EventConstants.KEYBOARD_ENTER) {
        that.save();
      }
    });
  },
};
