import { createStore } from "redux";
import rootReducer from "./reducers";

// Basic redux store
const store = createStore(rootReducer);

export default store;
