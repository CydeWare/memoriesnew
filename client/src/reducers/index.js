import { combineReducers } from "redux";
import auth from "./auth.js";
import posts from "./posts.js";
import error from "./error.js";

const allReducers = combineReducers({
    posts, //same as (posts: posts)
    auth,
    error
})

export default allReducers;