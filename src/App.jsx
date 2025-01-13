import Header from "./Header";
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import UserData from "./Pages/UserData";
import GenerateData from "./Pages/GenerateData";
import {AuthProvider} from "./Pages/AuthContext";

function App() {
   return (
      <AuthProvider>
         <BrowserRouter basename="/firebase">
            <Header />
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/signUp" element={<Signup />} />
               <Route path="/logIn" element={<Login />} />
               <Route path="/profile" element={<Profile />} />
               <Route path="/userData" element={<UserData />} />
               <Route path="/generateData" element={<GenerateData />} />
            </Routes>
         </BrowserRouter>
      </AuthProvider>
   );
}

export default App;
