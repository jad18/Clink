import React from 'react';

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
  
            <p><input type = "checkbox"
                id = "Baseball"
                value = "Baseball" />
            <label for = "Baseball">Baseball</label></p>
  
        </form>
        </>
    );
}

export default SportsForm;