import React, { Component } from "react";
import "./profile.css";
import "../App.css";
export default class Profile extends Component {
  render() {
    return (
      <div className="App">
        <div id="stripes" />

        <div id="card">
          <h2>{sessionStorage.getItem("username")}</h2>
          <ul id="tags"></ul>
          <ul id="boxes">
            <lo id="Pers">
              <h4>Personality</h4>
              {sessionStorage.getItem("profile_arts")}
            </lo>
            <lo id="Pinfo">
              {" "}
              <h4>Personal Information</h4>
              {sessionStorage.getItem("profile_arts")}
            </lo>
            <lo id="bio">
              <h4>About me</h4>
              {sessionStorage.getItem("profile_arts")}
            </lo>
            <div id="hobbies">
              <h4>Interested in</h4>
              {sessionStorage.getItem("profile_arts")}
              <span class="middle">
                <ul>
                  Movies:
                  <lo>
                    {JSON.parse(sessionStorage.getItem("profile_arts")).join(
                      ", "
                    )}
                  </lo>
                </ul>
                <ul>
                  Sports:
                  <lo>
                    {JSON.parse(sessionStorage.getItem("profile_arts")).join(
                      ", "
                    )}
                  </lo>
                </ul>
                <ul>
                  Arts
                  <lo>
                    {JSON.parse(sessionStorage.getItem("profile_arts")).join(
                      ", "
                    )}
                  </lo>
                </ul>
                <ul>
                  Indoor Activities:
                  <lo>
                    {JSON.parse(sessionStorage.getItem("profile_arts")).join(
                      ", "
                    )}
                  </lo>
                </ul>
                <ul>
                  Outdoor Activities:
                  <lo>
                    {JSON.parse(sessionStorage.getItem("profile_arts")).join(
                      ", "
                    )}
                  </lo>
                </ul>
                <ul>
                  Cuisines:
                  <lo>
                    {JSON.parse(sessionStorage.getItem("profile_arts")).join(
                      ", "
                    )}
                  </lo>
                </ul>
              </span>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}
