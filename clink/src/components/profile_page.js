import React, { Component } from "react";
import "./profile.css";
import "../App.css";
export default class Profile extends Component {
  render() {
    return (
      <div1>
        <h3>{sessionStorage.getItem("username") + "'s Profile"}</h3>
        <div class="card">
          <ul id="nav_section">
            <li>
              <b href="#">Art</b>
              <ul>
                <li>
                  <a href="#">
                    {JSON.parse(sessionStorage.getItem("profile_arts")).join(
                      " "
                    )}
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <b href="#">Cusine</b>
              <ul>
                <li>
                  <a href="#">
                    {JSON.parse(sessionStorage.getItem("profile_arts")).join(
                      " "
                    )}
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <b href="#">Movies</b>
              <ul>
                <li>
                  <a href="#">
                    {JSON.parse(sessionStorage.getItem("profile_movies")).join(
                      " "
                    )}
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <b href="#">Indoor Act</b>
              <ul>
                <li>
                  <a href="#">
                    {JSON.parse(sessionStorage.getItem("profile_arts")).join(
                      " "
                    )}
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <b href="#">Outdoor Act</b>
              <ul>
                <li>
                  <a href="#">
                    {JSON.parse(sessionStorage.getItem("profile_arts")).join(
                      " "
                    )}
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <b href="#">Sports</b>
              <ul>
                <li>
                  <a href="#">
                    {JSON.parse(sessionStorage.getItem("profile_sports")).join(
                      " "
                    )}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div1>
    );
  }
}
