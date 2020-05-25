import React from "react";
import { Link } from "react-router-dom";

function ChangeProfilePage() {
  sessionStorage.setItem("lastValidPage", "/change_profile");

  return (
    <div className="App">
      <h2>Choose a section of your profile to change:</h2>

      <Link to="/change_profile/sports">
        <button className="link-button2">Start from the beginning</button>
      </Link>

      <table id="profile-link-table">
        <tbody>
          <tr className="table-row">
            <td className="table-column">
              <Link to="/change_profile/sports">
                <button className="link-button3">Sports</button>
              </Link>
            </td>
            <td className="table-column">
              <Link to="/change_profile/movies">
                <button className="link-button3">TV/Movies</button>
              </Link>
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-column">
              <Link to="/change_profile/outdoor_activities">
                <button className="link-button3">Outdoor Activities</button>
              </Link>
            </td>
            <td className="table-column">
              <Link to="/change_profile/indoor_activities">
                <button className="link-button3">Indoor Activities</button>
              </Link>
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-column">
              <Link to="/change_profile/cuisines">
                <button className="link-button3">Cuisines</button>
              </Link>
            </td>
            <td className="table-column">
              <Link to="/change_profile/arts_and_media">
                <button className="link-button3">Arts and Media</button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>

      <table id="profile-link-table">
        <tr className="table-row">
          <td className="table-column">
            <Link to="/change_profile/sports">
              <button className="link-button3">Sports</button>
            </Link>
          </td>
          <td className="table-column">
            <Link to="/change_profile/movies">
              <button className="link-button3">Movies</button>
            </Link>
          </td>
        </tr>
        <tr className="table-row">
          <td className="table-column">This is number 3.</td>
          <td className="table-column">This is number 4.</td>
        </tr>
        <tr className="table-row">
          <td className="table-column">This is number 5.</td>
          <td className="table-column">This is number 6.</td>
        </tr>
      </table>

      <p></p>
      <Link to="/">
        <button className="link-button2">Back to Home</button>
      </Link>
    </div>
  );
}

export default ChangeProfilePage;
