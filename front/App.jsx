import React, { useState } from 'react';
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

function App() {
  const [form, setForm] =useState("login");
  return (
    <>
    {form == "login" ? (
      <LogIn FormHandle ={setForm}/>) : 
      ( <SignUp FormHandle ={setForm}/>)}
    </>
  );
}


export default App;