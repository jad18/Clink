import React from "react";
import "./profile.css";
import "../App.css";

function extractListItems(list)
{
    let str = " ";
    for(let i=0; i<list.length; i++)
    {
        if(i===list.length-1) str += list[i];
        else str += list[i] + ', ';

    }
    return str;
}


function extractPersonalityItems(list)
{
    if(list.length > 1)
    {
        var mb = list[0];
        var en = list[1];

        return(
          <div>
            <p>
              <strong>Myers-Briggs:</strong>
              {(mb !== "NoneMB") ? " " + mb : ""}
            </p>
            <p>
              <strong>Enneagram:</strong>
              {(en !== "NoneEn") ? " " + en : ""}
            </p>
          </div>
        );
    }

    return(
      <div>
            <p>
              <strong>Myers-Briggs:</strong>
            </p>
            <p>
              <strong>Enneagram:</strong>
            </p>
          </div>
    );
}


function extractPersonalInfoItems(list)
{
  if(list.length > 2)
    {
        var schoolYear = list[0];
        var religion = list[1];
        var gender = list[2];

        if(gender === "N/S") gender = "Not specified in list";

        return(
          <div>
            <p>
              <strong>School Year:</strong>
              {(schoolYear !== "NoneYear") ? " " + schoolYear : ""}
            </p>
            <p>
              <strong>Religion:</strong>
              {(religion !== "NoneReligion") ? " " + religion : ""}
            </p>
            <p>
              <strong>Gender:</strong>
              {(gender !== "NoneGender") ? " " + gender : ""}
            </p>
          </div>
        );
    }
  
    return(
      <div>
            <p>
              <strong>School Year:</strong>
            </p>
            <p>
              <strong>Religion:</strong>
            </p>
            <p>
              <strong>Gender:</strong>
            </p>
          </div>
    );
}



export default class Profile extends React.Component {
  constructor()
  {
    super();
    sessionStorage.setItem("lastValidPage", "/profile");
  }

  render() {
    return (
      <div className="App">

        <h1>Your Profile</h1>

        <div id="outer-box">
          <div id="stripes" />
                    
          <div id="Pers">
              <u><h4 className="section-header">Personality</h4></u>
              {extractPersonalityItems(JSON.parse(sessionStorage.getItem("profile_personality")))}
          </div>
                
          <div id="Pinfo">
            <u><h4 className="section-header">Personal Information</h4></u>
            {extractPersonalInfoItems(JSON.parse(sessionStorage.getItem("profile_personalInfo")))}
          </div>
                
          <div id="bio">
            <u><h4 className="section-header">About Me</h4></u>
            {sessionStorage.getItem("bio")}
          </div>
          <div id="hobbies">
            <u><h4 className="section-header">Interests</h4></u>
            <ul id="interest-list">
              <li>
                <strong>Sports:</strong>
                {extractListItems(JSON.parse(sessionStorage.getItem("profile_sports")))}
              </li>
              <li>
                <strong>Movies:</strong>
                {extractListItems(JSON.parse(sessionStorage.getItem("profile_movies")))}
              </li>
              <li>
                <strong>Indoor Activities:</strong>
                {extractListItems(JSON.parse(sessionStorage.getItem("profile_indoor")))}
               </li>
              <li>
                <strong>Outdoor Activities:</strong>
                {extractListItems(JSON.parse(sessionStorage.getItem("profile_outdoor")))}
              </li>
              <li>
                <strong>Types of Food:</strong>
                {extractListItems(JSON.parse(sessionStorage.getItem("profile_cuisines")))}
              </li>
              <li>
                <strong>Arts, Theater, and Media:</strong>
                {extractListItems(JSON.parse(sessionStorage.getItem("profile_arts")))}
              </li>
            </ul>
          </div>
                    
          <div id="card">
            <h2>{sessionStorage.getItem("username")}</h2>
          </div>
        </div>
      </div>
    );
  }
}