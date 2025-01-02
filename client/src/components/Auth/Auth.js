import React, { useState, useEffect } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core'
import Icon from "./Icon";
// import { GoogleAuth } from "google-auth-library"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import Input from "./Input";
import "@react-oauth/google";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate, useNavigation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signin, signup, sign } from "../../actions/auth"
import * as jose from 'jose'
import { useSelector } from 'react-redux';


import useStyles from "./styles.js"

const initialState = { firstName: " ", lastName: " ", email: " ", password: " ", confirmPassword: " "};

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const error = useSelector((state) => state.error);
    // const [userAlreadyExistError, setUserAlreadyExistError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        if(isSignup){
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false);
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    function showError(error){
        if(error){
            return ( <Typography style={{marginTop: "20px", fontStyle: "bold", textAlign: "center"}}variant="h6" color="secondary" size="medium">{error}</Typography> )
        }
    }

    //   const login = useGoogleLogin({
    //     // flow: 'auth-code',
    //     // scope: "https://www.googleapis.com/auth/userinfo.profile",
    //     onSuccess: async (tokenResponse) => {
    //         console.log(tokenResponse)
    //         const data = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`)
    //         const result = await data?.json();
    //         console.log(data);
    //         console.log(result);

    //         const secret = new TextEncoder().encode(
    //             "test"
    //         );

    //         const token = await new jose.SignJWT({ email: result.email, id: result.sub}).setProtectedHeader({ alg: "HS256"}).setExpirationTime('1h').sign(secret);
            
    //         console.log(token);
            

    //         try{
    //             dispatch({ type: "AUTH", data : {result, token}})

    //             navigate("/");
    //         }catch(error){
    //             console.log(error)
    //         }

    //         //In google login, make your own token?
    //     },
    //     onError: tokenResponse => console.log(tokenResponse)
    //   });

    const login = useGoogleLogin({
        // flow: 'auth-code',
        // scope: "https://www.googleapis.com/auth/userinfo.profile",
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse)
            const data = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`)
            const result = await data?.json();
            console.log(data);
            console.log(result);

            // const secret = new TextEncoder().encode(
            //     "test"
            // );

            // const token = await new jose.SignJWT({ email: result.email, id: result.sub}).setProtectedHeader({ alg: "HS256"}).setExpirationTime('1h').sign(secret);
            
            // console.log(token);
            

            // const secret = new TextEncoder().encode("test");

            // const jwt = await new SignJWT({ email: result.email, id: result.sub })
            //             .setProtectedHeader({ alg: "HS256" })
            //             .setExpirationTime('1h')
            //             .sign(secret);

            try{

                dispatch(sign(result, navigate))

            }catch(error){
                console.log(error)
            }

            //In google login, make your own token?
        },
        onError: tokenResponse => console.log(tokenResponse)
      });




    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? "Sign up" : "Sign in"}</Typography>
                <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={(e) => handleChange(e)} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={(e) => handleChange(e)} half />
                                </>
                                
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={(e) => handleChange(e)} type="email"/>
                        <Input name="password" label="Password" handleChange={(e) => handleChange(e)} type={showPassword ? "text" : "password"} handleShowPassword={() => handleShowPassword()}/>
                        { isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={(e) => handleChange(e)} type="password"/>}
                    </Grid>          
                    {
                        showError(error)
                    }
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    {
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={login} startIcon={<Icon />} variant="contained">
                            Google Sign In
                        </Button>
                    }
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
    //If can, try to use regex to tell if it is a valid email address

    /*
    details
: 
"Not a valid origin for the client: http://localhost:3000 has not been registered for client ID 639175723381-n4uer5jo9tl8cmknso0c1si4hf91mkci.apps.googleusercontent.com. Please go to https://console.developers.google.com/ and register this origin for your project's client ID."
error
: 
"idpiframe_initialization_failed"
    */
   /*
details
: 
"You have created a new client application that uses libraries for user authentication or authorization that will soon be deprecated. New clients must use the new libraries instead; existing clients must also migrate before these libraries are deprecated. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."

https://developers.google.com/identity/gsi/web/guides/gis-migration

error
: 
"idpiframe_initialization_failed"

   */
    
    //CLIENT ID 1: 639175723381-n4uer5jo9tl8cmknso0c1si4hf91mkci.apps.googleusercontent.com
   //CLIENT ID 2: 753487592976-9f1s9qq83228vvdigoq2unnh7vlfhk3q.apps.googleusercontent.com
   //CLIENT ID 3: 272822727170-cqs8ra888r2mh3ddqv0v172pkkmr7v6m.apps.googleusercontent.com
}

export default Auth