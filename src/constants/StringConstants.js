/* Common Strings */
const STRING_EMPTY = '';

/* Buttons & Titles */
const ADD_NEW_FAVE = 'Add New Favourites';
const DEL_ALL = 'Delete All';
const EDIT = 'Edit';
const DELETE = 'Delete';
const OPEN_URL = 'Open URL';
const MOVE = 'Move';
const RENAME = 'Rename';
const ADD_FOLDER = 'Add Folder';
const FAVOURITES = 'Favourites';
const RENAME_FOLDER = 'Rename Folder';

/* URL Path */
const FAVEICON_PATH = 'https://s2.googleusercontent.com/s2/favicons?domain=';

/* Web Related */
const WEB_WWW = 'www';
const WEB_HTTPS = 'https';
const WEB_HTTPS_PREFIX = 'https://';

/* Validation Messages */
const BLANK_VALIDATION = (fieldName) => `${fieldName} must not be blank`;

/* Global Keys */
const STORAGE_ITEMS_KEY = 'faveItems';
const STORAGE_FOLDER_KEYS = 'keysForFolders';

/* Notification Messages */
const ADDED_MESSAGE = ' has been added';
const EDITED_MESSAGE = ' has been edited';
const DELETED_SINGLE_MESSAGE = ' has been deleted';
const DELETED_ALL_MESSAGE = ' have been deleted';
const ITEM = 'item';
const ITEMS = 'items';
const FOLDER_EXIST_MESSAGE = ' folder already exist';
const FOLDER_EDIT_MESSAGE = ' folder has been edited';
const FOLDER_ADDED_MESSAGE = ' folder has been added';
const FOLDER_DEL_MESSAGE = ' folder has been deleted';
const FOLDER_LAST_MESSAGE = 'At least one folder needs to remain';

/* Button Colors */
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
  ADD_FOLDER,
  RENAME,
  STORAGE_FOLDER_KEYS,
  FAVOURITES,
  RENAME_FOLDER,
  FOLDER_EXIST_MESSAGE,
  FOLDER_EDIT_MESSAGE,
  FOLDER_ADDED_MESSAGE,
  FOLDER_DEL_MESSAGE,
  FOLDER_LAST_MESSAGE,
};
