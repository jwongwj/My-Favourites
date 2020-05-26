/* #region  Common Strings */
const STRING_EMPTY = '';
/* #endregion */

/* #region  Buttons */
const ADD_NEW_FAVE = 'Add New Favourites';
const DEL_ALL = 'Delete All';
const EDIT = 'Edit';
const DELETE = 'Delete';
const OPEN_URL = 'Open URL';
const SORT = 'Sort';
/* #endregion */

/* #region  URL Path */
const FAVEICON_PATH = 'https://s2.googleusercontent.com/s2/favicons?domain=';
/* #endregion */

/* #region  Web Related */
const WEB_WWW = 'www';
const WEB_HTTPS = 'https';
const WEB_HTTPS_PREFIX = 'https://';
/* #endregion */

/* #region  Validation Messages */
const BLANK_VALIDATION = (fieldName) => `${fieldName} must not be blank`;
/* #endregion */

/* #region  Global Keys */
const STORAGE_ITEMS_KEY = 'faveItems';
/* #endregion */

export default {
  STRING_EMPTY,
  ADD_NEW_FAVE,
  DEL_ALL,
  EDIT,
  DELETE,
  OPEN_URL,
  SORT,
  FAVEICON_PATH,
  WEB_WWW,
  WEB_HTTPS,
  WEB_HTTPS_PREFIX,
  BLANK_VALIDATION,
  STORAGE_ITEMS_KEY,
};
