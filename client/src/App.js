import React from 'react';
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";

import { BrowserRouter, Routes, Route } from "react-router-dom"; //Switch is not supported anymore in react-router-dom new version v6


const App = () => {

    return (
        


        <BrowserRouter>
        <Container max-width="lg">
            <Navbar />
            <Routes>
                <Route path="/" exact element={< Home/>} />
                <Route path="/auth" exact element={< Auth />} />
            </Routes>
        </Container>
        </BrowserRouter>

    );
    
}
 
export default App;