import React from "react";
import { Link } from "react-router-dom";
import "./signup-style.css";

const signup = () => {
  return (
    <div>
      <div className="App">
        <body>
          <hr />
          <div className="inputs-signup">
            <p>Name</p>
            <input type="text" />
            <p>Lastname</p>
            <input type="text" />
            <p>password</p>
            <input type="text" />
            <p>password</p>
            <input type="text" />
            <button className="create-button">Create</button>
          </div>
        </body>
      </div>
      <hr />
    </div>
  );
};
export default signup;
