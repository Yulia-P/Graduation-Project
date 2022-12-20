import React, { useState } from "react"; 
 
export const Recept = () => { 
  const [title, setTitle] = useState(""); 
  const [body, setBody] = useState(""); 
 
  const addDataFromInput = () => { 
    //here you may send post request 
    alert(`Input 1:${title} \n Input 2:${body}`); 
    setTitle(""); 
    setBody(""); 
  }; 
 
  return ( 
    <div> 
      <form> 
        <h1>Input 1</h1> 
        <input 
          type="text" 
          required 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        /> 
        <h1>Input 2</h1> 
        <input 
          type="text" 
          required 
          value={body} 
          onChange={(e) => setBody(e.target.value)} 
        /> 
      </form> 
      <button onClick={(e) => addDataFromInput()}>Add</button> 
    </div> 
  ); 
};