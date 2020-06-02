import React from "react";
import "./profile.css";
import "../App.css";

function extractListItems(list) {
  let str = " ";
  for (let i = 0; i < list.length; i++) {
    if (i === list.length - 1) str += list[i];
    else str += list[i] + ", ";
  }
  return str;
}

function extractPersonalityItems(list) {
  if (list.length > 1) {
    var mb = list[0];
    var en = list[1];

    if (mb !== "NoneMB") {
      if (en !== "NoneEn") {
        return (
          <div>
            <p>Myers-Briggs: {mb}</p>
            <p>Enneagram: {en}</p>
          </div>
        );
      } else return <p>Myers-Briggs: {mb}</p>;
    } else if (en !== "NoneEn") return <p>Enneagram: {en}</p>;
  }

  return null;
}

function extractPersonalInfoItems(list) {
  if (list.length > 2) {
    var schoolYear = list[0];
    var religion = list[1];
    var gender = list[2];

    if (gender === "N/S") gender = "Not included in list";

    if (schoolYear !== "NoneYear") {
      if (religion !== "NoneReligion") {
        if (gender !== "NoneGender") {
          return (
            <div>
              <p>{schoolYear} Year</p>
              <p>Religion: {religion}</p>
              <p>Gender: {gender}</p>
            </div>
          );
        } else {
          return (
            <div>
              <p>{schoolYear} Year</p>
              <p>Religion: {religion}</p>
            </div>
          );
        }
      } else {
        if (gender !== "NoneGender") {
          return (
            <div>
              <p>{schoolYear} Year</p>
              <p>Gender: {gender}</p>
            </div>
          );
        } else {
          return (
            <div>
              <p>{schoolYear} Year</p>
            </div>
          );
        }
      }
    } else if (religion !== "NoneReligion") {
      if (gender !== "NoneGender") {
        return (
          <div>
            <p>Religion: {religion}</p>
            <p>Gender: {gender}</p>
          </div>
        );
      } else {
        return (
          <div>
            <p>Religion: {religion}</p>
          </div>
        );
      }
    } else if (gender !== "NoneGender") {
      return <p>Gender: {gender}</p>;
    }
  }

  return null;
}

export default class Profile extends React.Component {
  constructor() {
    super();
    sessionStorage.setItem("lastValidPage", "/profile");
  }
  render() {
    return (
      <div className="App">
        <div id="stripes" />

        <div id="card">
          <h2>{sessionStorage.getItem("username")}'s Profile</h2>
          <ul id="tags"></ul>
          <ul id="boxes">
            <lo id="Pers">
              <u>
                <h4 className="section-header">Personality</h4>
              </u>
              {extractPersonalityItems(
                JSON.parse(sessionStorage.getItem("profile_personality"))
              )}
            </lo>
            <div>
              <lo id="Pinfo">
                <u>
                  <h4 className="section-header">Personal Information</h4>
                </u>
                {extractPersonalInfoItems(
                  JSON.parse(sessionStorage.getItem("profile_personalInfo"))
                )}
              </lo>
            </div>
            <lo id="bio">
              <u>
                <h4 className="section-header">About Me</h4>
              </u>
              {sessionStorage.getItem("bio")}
            </lo>
            <div id="hobbies">
              <u>
                <h4 className="section-header">Interests</h4>
              </u>
              <span className="middle">
                <ul id="interest-list">
                  <li>
                    <strong>Sports:</strong>
                    {extractListItems(
                      JSON.parse(sessionStorage.getItem("profile_sports"))
                    )}
                  </li>
                  <li>
                    <strong>Movies:</strong>
                    {extractListItems(
                      JSON.parse(sessionStorage.getItem("profile_movies"))
                    )}
                  </li>
                  <li>
                    <strong>Indoor Activities:</strong>
                    {extractListItems(
                      JSON.parse(sessionStorage.getItem("profile_indoor"))
                    )}
                  </li>
                  <li>
                    <strong>Outdoor Activities:</strong>
                    {extractListItems(
                      JSON.parse(sessionStorage.getItem("profile_outdoor"))
                    )}
                  </li>
                  <li>
                    <strong>Types of Food:</strong>
                    {extractListItems(
                      JSON.parse(sessionStorage.getItem("profile_cuisines"))
                    )}
                  </li>
                  <li>
                    <strong>Arts, Theater, and Media:</strong>
                    {extractListItems(
                      JSON.parse(sessionStorage.getItem("profile_arts"))
                    )}
                  </li>
                </ul>
              </span>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}
