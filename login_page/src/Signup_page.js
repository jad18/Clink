import React from "react";
import "./signup-style.css"
const Signup=()=>{
return(
<>
<div className="App"> 
    <body>
    <hr/>
      <div className="inputs-signup">
          <p>Name</p>
          <input type="text" />
          <p>Lastname</p>
          <input type="text" />
          <p>password</p>
          <input type="text" />     
         <button className="create-button">Create</button>
     </div>     
       
      </body>
    </div>
    <hr/>
    </>
);
}
export default Signup;