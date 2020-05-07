import React from 'react';
import {Link} from 'react-router-dom';

const SportsForm = () => {
    return (
        <>
        <div class="App">
            <h1>Sports Information</h1>
            <h4>
                Choose your preferences out of the following sports
                activities:
            </h4>
        </div>
        <form class="form-body">

            <div class='form-row'>
            <div class='form-column'>
            <p><input type = "checkbox"
                id = "Football"
                value = "Football" />
            <label for = "Football">Football</label></p>
            </div>

            <div class='form-column'>
            <p><input type = "checkbox"
                id = "Soccer"
                value = "Soccer" />
            <label for = "Soccer">Soccer</label></p>
            </div>
            </div>
  
            <div class='form-row'>
            <div class='form-column'>
            <p><input type = "checkbox"
                id = "Football"
                value = "Football" />
            <label for = "Football">Football</label></p>
            </div>

            <div class='form-column'>
            <p><input type = "checkbox"
                id = "Soccer"
                value = "Soccer" />
            <label for = "Soccer">Soccer</label></p>
            </div>
            </div>

            <div class='form-row'>
            <div class='form-column'>
            <p><input type = "checkbox"
                id = "Football"
                value = "Football" />
            <label for = "Football">Football</label></p>
            </div>

            <div class='form-column'>
            <p><input type = "checkbox"
                id = "Soccer"
                value = "Soccer" />
            <label for = "Soccer">Soccer</label></p>
            </div>
            </div>

            <div class='form-row'>
            <div class='form-column'>
            <p><input type = "checkbox"
                id = "Football"
                value = "Football" />
            <label for = "Football">Football</label></p>
            </div>

            <div class='form-column'>
            <p><input type = "checkbox"
                id = "Soccer"
                value = "Soccer" />
            <label for = "Soccer">Soccer</label></p>
            </div>
            </div>

            <div class='form-row'>
            <div class='form-column'>
            <p><input type = "checkbox"
                id = "Football"
                value = "Football" />
            <label for = "Football">Football</label></p>
            </div>

            <div class='form-column'>
            <p><input type = "checkbox"
                id = "Soccer"
                value = "Soccer" />
            <label for = "Soccer">Soccer</label></p>
            </div>
            </div>
  
        </form>

        <p></p>
        <Link to='/change_profile/sports'>
                <button class="link-button2">Submit Changes</button>
            </Link>
        <p></p>
        <p>
            <Link to='/change_profile'>
                <button class="link-button2">Back to Profile Change</button>
            </Link>
            <Link to='/'>
                <button class="link-button2">Next Profile Section</button>
            </Link>
        </p>
        </>
    );
}

export default SportsForm;