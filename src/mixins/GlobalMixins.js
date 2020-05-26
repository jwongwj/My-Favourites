import StringConstants from '@/constants/StringConstants';

export default {
  methods: {
    checkExist(...args) {
      for (let i = 0; i < args.length; i++) {
        // Null or undefined.
        const value = args[i];
        if (
          value == null ||
          // Check if a Set() or Map() is empty
          value.size === 0 ||
          // Length is zero && it's not a function.
          (value.length === 0 && typeof value !== 'function') ||
          // Is an Object && has no keys.
          (value.constructor === Object && Object.keys(value).length === 0)
        ) {
          return false;
        }
      }
      return true;
    },
    emptyString(...args) {
      for (let i = 0; i < args.length; i++) {
        const value = args[i];
        if (value === StringConstants.STRING_EMPTY) {
          return false;
        }
      }
      return true;
    },
  },
};
