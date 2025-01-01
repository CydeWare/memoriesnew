import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Grow, Container, Grid } from '@material-ui/core';
import { getPosts } from "../../actions/posts.js";

import Posts from "../Posts/Posts.js";
import Form from "../Form/Form.js";

import useStyles from '../../styles';

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch, currentId])

    return ( 
        <Grow in>
                <Container>
                    <Grid container className={classes.mainContainer} justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
     );
}
 
export default Home;