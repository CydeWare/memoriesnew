import * as api from "../API";
import { UPDATE, FETCH_ALL, DELETE, LIKE, CREATE } from "../constants/actionTypes"; //We use this so it will give an error if we mispell something

//api.fetchPosts

//ACTION CREATORS

export const getPosts = () => async(dispatch) => {
    try {
        console.log("Post Fetched")
        const { data } = await api.fetchPosts();

        const action = {
            type: FETCH_ALL,
            payload: data
        }

        dispatch(action)
    }catch(error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        
        const { data } = await api.createPost(post);

        console.log("POST TO FIND NAME:", data)

        const action = {
            type: CREATE,
            payload: data
        }

        console.log("Post Created", data)

        dispatch(action);
    }catch(error) {
        console.log(error.response.data);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({type: UPDATE, payload: data});
    } catch(error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        await api.deletePost(id);

        console.log("Post deleted")
        dispatch({type: DELETE, payload: id})
    }catch(error){
        console.log(error);
    }
}

/* 

Make accounts so users can only like a post only once.

*/

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({type: LIKE, payload: data});
    }catch(error){
        console.log(error);
    }
}
