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
          <div id="bio">About me:</div>
          <div id="hobbies">
            Interested in :
            <ul>
              Movies:
              {JSON.parse(sessionStorage.getItem("profile_arts")).join(" ")}
            </ul>
            <span class="middle">
              <ul>
                Sports:
                {JSON.parse(sessionStorage.getItem("profile_arts")).join(" ")}
              </ul>
              <ul>
                Arts:
                {JSON.parse(sessionStorage.getItem("profile_arts")).join(" ")}
              </ul>
              <ul>
                Indoor Activities:
                {JSON.parse(sessionStorage.getItem("profile_arts")).join(" ")}
              </ul>
              <ul>
                Outdoor Activities:
                {JSON.parse(sessionStorage.getItem("profile_arts")).join(" ")}
              </ul>
              <ul>
                Cusines:
                {JSON.parse(sessionStorage.getItem("profile_arts")).join(" ")}
              </ul>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
