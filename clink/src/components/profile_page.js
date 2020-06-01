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

        if(mb !== "NoneMB")
        {
            if(en !== "NoneEn")
            {
              return(
                <div>
                  <p>Myers-Briggs: {mb}</p>
                  <p>Enneagram: {en}</p>
                </div>
              );
            }
            else return(<p>Myers-Briggs: {mb}</p>);
        }
        else if (en !== "NoneEn") return(<p>Enneagram: {en}</p>)
    }

    return null;
}

function extractPersonalInfoItems(list)
{
    if(list.length > 2)
    {
        var schoolYear = list[0];
        var religion = list[1];
        var gender = list[2];

        if(gender === "N/S") gender = "Not included in list";

        if(schoolYear !== "NoneYear")
        {
            if(religion !== "NoneReligion")
            {
              if(gender !== "NoneGender")
              {
                return(
                <div>
                  <p>{schoolYear} Year</p>
                  <p>Religion: {religion}</p>
                  <p>Gender: {gender}</p>
                </div>
                );
              }
              else
              {
                return(
                  <div>
                    <p>{schoolYear} Year</p>
                    <p>Religion: {religion}</p>
                  </div>
                  );
              }
            }
            else
            {
              if(gender !== "NoneGender")
              {
                return(
                <div>
                  <p>{schoolYear} Year</p>
                  <p>Gender: {gender}</p>
                </div>
                );
              }
              else
              {
                return(
                  <div>
                    <p>{schoolYear} Year</p>
                  </div>
                  );
              }
            }
        }
        else if(religion !== "NoneReligion")
        {
            if(gender !== "NoneGender")
            {
              return(
                <div>
                  <p>Religion: {religion}</p>
                  <p>Gender: {gender}</p>
                </div>
                );
            }
            else
            {
              return(
                <div>
                  <p>Religion: {religion}</p>
                </div>
                );
            }
        }
        else if (gender !== "NoneGender")
        {
            return <p>Gender: {gender}</p>;
        }
    }

    return null;
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



/*
 <div id="stripes" />

        <div id="card">
          <h2>{sessionStorage.getItem("username")}'s Profile</h2>
          <ul id="tags"></ul>
          <ul id="boxes">
            <lo id="Pers">
              <u><h4 className="section-header">Personality</h4></u>
              {extractPersonalityItems(JSON.parse(sessionStorage.getItem("profile_personality")))}
            </lo>
            <div>
            <lo id="Pinfo">
              <u><h4 className="section-header">Personal Information</h4></u>
              {extractPersonalInfoItems(JSON.parse(sessionStorage.getItem("profile_personalInfo")))}
            </lo>
            </div>
            <lo id="bio">
              <u><h4 className="section-header">About Me</h4></u>
              {sessionStorage.getItem("bio")}
            </lo>
            <div id="hobbies">
              <u><h4 className="section-header">Interests</h4></u>
              <span className="middle">
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
              </span>
            </div>
          </ul>
        </div>*/


/*
.App {
  font-family: sans-serif;
  text-align: center;
}
#stripes {
  background: #999955;
  background-image: linear-gradient(
    #dab046 2%,
    rgb(212, 186, 182) 20%,
    rgb(247, 109, 93) 40%,
    rgb(133, 199, 27) 30%,
    rgb(236, 137, 142) 60%,
    rgb(212, 113, 138) 60%,
    rgb(116, 93, 99) 80%,
    #a38f98 80%
  );
  margin: 0 auto;
  margin-top: 235px;
  width: 100%;
  height: 150px;
  box-shadow: -30px 0 35px -25px black, 20px 0 45px -25px black;
}
#stripes:before {
  content: "";
  position: absolute;
  background: rgb(241, 224, 180);
  border-radius: 15px;
  z-index: -1;
  margin-top: 257px;
  width: 950px;
  height: 520px;
  padding: 25px;
  padding-top: 0;
  padding-bottom: 0;
  left: 48%;
  top: 66px;
  margin-left: -444px;
  box-shadow: #333;
}

#card {
  position: absolute;
  border-radius: 10px;
  margin-top: 300px;
  width: 850px;
  height: 435px;
  padding: 25px;
  padding-top: 0;
  padding-bottom: 0;
  left: 48%;
  top: 67.5px;
  margin-left: -392px;
  background: #e9e2d0;
  box-shadow: -30px 0 35px -25px black, 20px 0 45px -25px black;
  z-index: 1;
}

#card h2 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
  sans-serif;
  color: #333;
  margin: 0 auto;
  padding: 10px;
  font-size: 15pt;
}

#card p {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: rgb(39, 38, 38);
  font-size: 16px;
}

.section-header
{
  margin: 0px;
  text-align: center;
  margin-bottom: 8px;
}


#card span {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  line-height: 140%;
  font-size: 14px;
}
#bio {
  background-color: rgb(226, 223, 215);
  height: 340px;
  position: absolute;
  padding: 8px;
  margin-top: -10px;
  border-radius: 10px;
  width: 200px;
  margin-left: -170px;
  box-shadow: -30px 0 35px -25px rgb(128, 118, 118),
    20px 0 45px -25px rgb(128, 118, 118);
  color: rgb(0, 0, 0);
  text-align: left;
  overflow: scroll;
}


#Pers {
  background-color: rgb(226, 223, 215);
  height: 150px;
  position: absolute;
  padding: 8px;
  margin-top: -10px;
  border-radius: 10px;
  width: 200px;
  margin-left: -430px;
  box-shadow: -30px 0 35px -25px rgb(128, 118, 118),
    20px 0 45px -25px rgb(128, 118, 118);
  color: rgb(0, 0, 0);
  text-align: left;
}
#Pinfo {
  background-color: rgb(226, 223, 215);
  height: 150px;
  position: absolute;
  padding: 8px;
  margin-top: 180px;
  border-radius: 10px;
  width: 200px;
  margin-left: -430px;
  box-shadow: -30px 0 35px -25px rgb(128, 118, 118),
    20px 0 45px -25px rgb(128, 118, 118);
  color: rgb(0, 0, 0);
  text-align: left;
}
#hobbies {
  background-color: rgb(226, 223, 215);
  height: 340px;
  position: absolute;
  padding: 8px;
  margin-top: -10px;
  border-radius: 20px;
  width: 300px;
  margin-left: 490px;
  box-shadow: -30px 0 35px -25px rgb(128, 118, 118),
    20px 0 45px -25px rgb(128, 118, 118);
  color: rgb(0, 0, 0);
  text-align: left;
}
#span {
  margin-bottom: 10px;
}
*/