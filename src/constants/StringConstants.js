// VS Code Extension used - #region folding for VS Code (Ctrl M + R)

/* #region  Common Strings */
const STRING_EMPTY = '';
/* #endregion */

/* #region  Buttons */
const ADD_NEW_FAVE = 'Add New Favourites';
const DEL_ALL = 'Delete All';
const EDIT = 'Edit';
const DELETE = 'Delete';
const OPEN_URL = 'Open URL';
const MOVE = 'Move';
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

/* #region  Notification Messages */
const ADDED_MESSAGE = ' has been added to Favourites';
const EDITED_MESSAGE = ' has been edited';
const DELETED_SINGLE_MESSAGE = ' has been deleted';
const DELETED_ALL_MESSAGE = ' have been deleted';
const ITEM = 'item';
const ITEMS = 'items';
/* #endregion */

const SUCCESS_ALERT = 'success';
const WARNING_ALERT = 'warn';
const DELETED_ALERT = 'error';

export default {
  STRING_EMPTY,
  ADD_NEW_FAVE,
  DEL_ALL,
  EDIT,
  DELETE,
  OPEN_URL,
  MOVE,
  FAVEICON_PATH,
  WEB_WWW,
  WEB_HTTPS,
  WEB_HTTPS_PREFIX,
  BLANK_VALIDATION,
  STORAGE_ITEMS_KEY,
  ADDED_MESSAGE,
  EDITED_MESSAGE,
  DELETED_ALERT,
  WARNING_ALERT,
  SUCCESS_ALERT,
  DELETED_SINGLE_MESSAGE,
  DELETED_ALL_MESSAGE,
  ITEM,
  ITEMS,
};
