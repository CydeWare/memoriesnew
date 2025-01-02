import React from 'react';
import Post from './Post/Post.js';
import useStyles from "./styles.js";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from '@material-ui/core';

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => { return state.posts});
    const classes = useStyles();

    console.log(posts);
    return (
        !posts.length ? <CircularProgress /> : 
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6}>
                <Post setCurrentId={setCurrentId} post={post}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default Posts;