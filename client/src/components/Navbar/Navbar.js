import React from 'react';
import { useState, useEffect} from 'react';
import { Typography, Toolbar, Button, Avatar } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import memories from "../../images/memories.png"; //don't forget to link it
import Appbar from '@material-ui/core/AppBar';
import useStyles from "./styles.js";
import decode from "jwt-decode";


const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    console.log(user);

    const logout = () => {
        dispatch({ type: "LOGOUT"})

        navigate("/")

        setUser(null)
    }

    useEffect(() => {
        const token = user?.token

        if(token){
            const decodedToken = decode(token);

            //decodedToken.exp is in miliseconds so we have to mutiply by 1000
            if(decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem("profile")))
    }, [location]);

    return ( 
        <Appbar position="static" color="inherit" className={classes.appBar}>
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result?.name} src={user.result.imageUrl}>{user?.result?.name?.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result?.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                )}
            </Toolbar>
        </Appbar>
     );
}
 
export default Navbar;

/*

File name 'c:/Users/Owner/Creative Cloud Files/JavaScript Project Memories/client/node_modules/@material-ui/core/Appbar/index.d.ts' differs from already included file name 'c:/Users/Owner/Creative Cloud Files/JavaScript Project Memories/client/node_modules/@material-ui/core/AppBar/index.d.ts' only in casing.
  The file is in the program because:
    Imported via '../AppBar' from file 'c:/Users/Owner/Creative Cloud Files/JavaScript Project Memories/client/node_modules/@material-ui/core/styles/overrides.d.ts'
    Imported via '../AppBar' from file 'c:/Users/Owner/Creative Cloud Files/JavaScript Project Memories/client/node_modules/@material-ui/core/styles/props.d.ts'
    Imported via './AppBar' from file 'c:/Users/Owner/Creative Cloud Files/JavaScript Project Memories/client/node_modules/@material-ui/core/index.d.ts'
    Imported via './AppBar' from file 'c:/Users/Owner/Creative Cloud Files/JavaScript Project Memories/client/node_modules/@material-ui/core/index.d.ts'
    Imported via '@material-ui/core/Appbar/index.js' from file 'c:/Users/Owner/Creative Cloud Files/JavaScript Project Memories/client/src/components/Navbar/Navbar.js' with packageId '@material-ui/core/Appbar/index.d.ts@4.12.4'

*/