import {
  ADD_ITEM,
  CHANGE_ACCOUNT,
  CHANGE_ITEM,
  DATA_RETRIEVE,
  FILTER_ITEMS,
  SAVE_PASS,
  SAVE_WEB3,
  SAVE_CONTRACT,
  LOGIN,
  SAVE_TX,
  LOADING,
} from "./constants";

const initialState = {
  addingItem: null, // To display the correct interface when adding an item
  items: [], // Items received from backend
  displayedItems: [], // Items displayed (for searching)
  currentItem: null, // To chose what item to display
  web3: null, // Saves the web3 access point,
  contract: null, // Saves the contract access point,
  account: "", // Saves the users address
  password: "", // Saves the users cyphered password
  pendingTxs: [],
  loggedIn: false, // Saves if the user has typed a password
  isLoading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_RETRIEVE: // User successfully logged in and we queried their data
      return {
        ...state,
        items: action.payload,
        displayedItems: action.payload,
      };
    case CHANGE_ITEM: // User clicked on object and we display that object's data
      return {
        ...state,
        currentItem: action.payload,
      };
    case LOADING: // Something needs to load
      return {
        ...state,
        isLoading: action.payload,
      };
    case ADD_ITEM: // Change item creation interface
      return {
        ...state,
        addingItem: action.payload,
      };
    case FILTER_ITEMS: // User searched
      return {
        ...state,
        displayedItems: action.payload,
      };
    case SAVE_WEB3: // User searched
      return {
        ...state,
        web3: action.payload,
      };
    case SAVE_CONTRACT: // User searched
      return {
        ...state,
        contract: action.payload,
      };
    case SAVE_PASS: // User searched
      return {
        ...state,
        password: action.payload,
      };
    case CHANGE_ACCOUNT: // User searched
      return {
        ...state,
        account: action.payload,
      };
    case LOGIN: // User searched
      return {
        ...state,
        loggedIn: action.payload,
      };
    case SAVE_TX:
      return {
        ...state,
        pendingTxs: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
