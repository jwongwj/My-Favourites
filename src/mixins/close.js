export default {
  created() {
    const that = this;

    document.addEventListener('keyup', (evt) => {
      if (evt.keyCode === 27) {
        that.close();
      }
    });
  },
};
