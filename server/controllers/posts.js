import mongoose from 'mongoose';
import PostMessage from '../model/postMessage.js';

const getPosts = async (req, res) => {
    try{
        const postMessages = await PostMessage.find();

        console.log(postMessages);

        res.status(200).json(postMessages);
    } catch(error){
        res.status(404).json({ success: false, message: error.message });
    }
}

const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString()});

    try{
        await newPost.save();

        res.status(201).json(newPost);
    }catch(error){
        res.status(409).json({ success: false, message: error.message });
    }
}

const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No such post with that id`)

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });

    res.json(updatedPost);
}

const deletePost = async (req, res) => {
    const { id } = req.params;

    console.log("POST REMOVED")

    if(!mongoose.Types.ObjectId.isValid(id)){ 
    
    console.log("Error: Post not removed")    
    return res.status(404).send(`No such post with that id`)

}

    await PostMessage.findByIdAndDelete(id);

    console.log("POST REMOVED")

    res.json({ message: "Post deleted succesfully"})
}

const likePost = async (req, res) => { 
    const { id } = req.params;

    if(!req.userId) return res.json({ message: "Unauthenticated"})

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No such post with that id");

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1) {
        //like post
        post.likes.push(req.userId)
    } else{
         //dislike
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }
    //{ likeCount: post.likeCount + 1 }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

    res.json(updatedPost);
}

export { getPosts, createPost, updatePost, deletePost, likePost };