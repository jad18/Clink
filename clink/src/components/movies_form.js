import React from "react";
import { Link } from "react-router-dom";

const MoviesForm = () => {
  return (
    <div>
      <div class="App">
        <h1>Movies</h1>
        <h4>Choose your preferences out of the following Movie Genres:</h4>
      </div>
      <form class="form-body">
        <div class="form-row">
          <div class="form-column">
            <p>
              <input type="checkbox" id="Romantic" value="Romantic" />
              <label for="Romantic">Romantic</label>
            </p>
          </div>

          <div class="form-column">
            <p>
              <input type="checkbox" id="Drama" value="Drama" />
              <label for="Drama">Drama</label>
            </p>
          </div>
        </div>

        <div class="form-row">
          <div class="form-column">
            <p>
              <input type="checkbox" id="Comedy" value="Comedy" />
              <label for="Comedy">Comedy</label>
            </p>
          </div>

          <div class="form-column">
            <p>
              <input type="checkbox" id="Horror" value="Horror" />
              <label for="Horror">Horror</label>
            </p>
          </div>
        </div>

        <div class="form-row">
          <div class="form-column">
            <p>
              <input type="checkbox" id="Action" value="Action" />
              <label for="Action">Action</label>
            </p>
          </div>

          <div class="form-column">
            <p>
              <input
                type="checkbox"
                id="Fantasy/Sci-Fi"
                value="Fantasy/Sci-Fi"
              />
              <label for="Fantasy/Sci-Fi">Fantasy/Sci-Fi</label>
            </p>
          </div>
        </div>

        <div class="form-row">
          <div class="form-column">
            <p>
              <input type="checkbox" id="Thriller" value="Thriller" />
              <label for="Thriller">Thriller</label>
            </p>
          </div>

          <div class="form-column">
            <p>
              <input type="checkbox" id="Psychological" value="Psychological" />
              <label for="Psychological">Psychological</label>
            </p>
          </div>
        </div>

        <div class="form-row">
          <div class="form-column">
            <p>
              <input type="checkbox" id="Tv Series" value="Tv Series" />
              <label for="Tv Series">Tv Series</label>
            </p>
          </div>

          <div class="form-column">
            <p>
              <input type="checkbox" id="Independent" value="Independent" />
              <label for="Independent">Independent</label>
            </p>
          </div>
        </div>
      </form>

      <p></p>
      <Link to="/change_profile/movies">
        <button class="link-button2">Submit Changes</button>
      </Link>
      <p></p>
      <p>
        <Link to="/change_profile">
          <button class="link-button2">Back to Profile Change</button>
        </Link>
        <Link to="/">
          <button class="link-button2">Next Profile Section</button>
        </Link>
      </p>
    </div>
  );
};

export default MoviesForm;
