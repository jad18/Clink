import React, { Component } from "react";
//import "./index.css";
//import "./profile.css";
//import "../App.css";
export default class Profile extends Component {
  render() {
    return (
      <div1>
        <div>
          <h2>Clink</h2>
        </div>
        <h3>Name</h3>
        <div class="card">
          <lines>
            <h4>Categories</h4>
            <ul class="stripes">Sports</ul>
            <ul class="stripes">Movies</ul>
            <ul class="stripes">Indoor Activities</ul>
            <ul class="stripes">Outdoor Activities</ul>
            <ul class="stripes">Art</ul>
            <ul class="stripes">Cusine</ul>
          </lines>
        </div>
        <div class="hobies">
          <h6>Likes</h6>
          <ul class="sub">
            <li>Horror</li>
            JSON.parse(sessionStorage.getIt)
            <li>Football</li>
            <li>Skiing</li>
            <li>Pottery</li>
            <li>Jogging</li>
            <li>Swimming</li>
            <li>The wWekknd</li>
          </ul>
        </div>
      </div1>
    );
  }
}
