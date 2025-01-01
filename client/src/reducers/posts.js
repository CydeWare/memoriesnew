import { UPDATE, FETCH_ALL, DELETE, LIKE, CREATE } from "../constants/actionTypes"; //We use this so it will give an error if we mispell something


const postReducer = (posts = [], action) => {
    switch(action.type) {   
        case FETCH_ALL:
            console.log("Fetched Reducer", action.payload)
            return action.payload;
        case CREATE:
            console.log("Post Reducer", action.payload)
            return [...posts, action.payload];
        case UPDATE:	
        
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)
        case DELETE:
            console.log("Delete Reducer", action.payload);    
            return posts.filter((post) => post._id !== action.payload);
        case LIKE:
            console.log("Like reducer")
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)
        default:
            return posts;
    }
}

export default postReducer;