import React from 'react';
import {Link} from 'react-router-dom';

class SearchPersonalityForm extends React.Component
{
    constructor()
    {
        super();

        sessionStorage.setItem("lastValidPage", "/search/personality");

        this.state = {
            hasChanges: false,
            trueValues: JSON.parse(sessionStorage.getItem("search_personality"))
        };

        this.submitForm = this.submitForm.bind(this);
        this.displayChanges = this.displayChanges.bind(this);
        this.listingChange = this.listingChange.bind(this);
    }

    
    
    submitForm(event) {
        event.preventDefault();
    
        if (this.state.hasChanges)
        {
            this.setState({ hasChanges: false });
            var trueEntries = [document.getElementById('myers-briggsSearch').value,
                            document.getElementById('enneagramSearch').value];
          
            console.log(trueEntries);
    
            sessionStorage.setItem(
                "search_personality",
                JSON.stringify(trueEntries)
            );

            let searchList = JSON.parse(sessionStorage.getItem("searchList"));
            searchList.push("personality");
            sessionStorage.setItem("searchList", JSON.stringify(searchList));
        }
    }

    displayChanges() {
        if (this.state.hasChanges)
          return <p>Don't forget to save your changes below:</p>;
        else return <p>Your request is up-to-date.</p>;
    }

    listingChange()
    {
        this.setState({hasChanges: true});
    }
   

    render() {
        return (
          <div>
            <div className="App">
              <h1>Personality</h1>
              <h4 className='about-page-para'>
                These personality metrics are a great way to match up with like-minded
                people.
              </h4>
            </div>
    
            <form onSubmit={this.submitForm} className="form-body">
              
              <p>
              <label for='myers-briggsSearch'>Myers Briggs: </label>
              <select name="myers-briggsSearch" id="myers-briggsSearch" onChange={this.listingChange}
                defaultValue={this.state.trueValues[0]}>
                <option id='NoneMB'value='NoneMB'>None selected</option>
                <option id='ISTJ' value='ISTJ'>ISTJ</option>
                <option id='ISTP' value='ISTP'>ISTP</option>
                <option id='ISFJ' value='ISFJ'>ISFJ</option>
                <option id='ISFP' value='ISFP'>ISFP</option>
                <option id='INFJ' value='INFJ'>INFJ</option>
                <option id='INFP' value='INFP'>INFP</option>
                <option id='INTJ' value='INTJ'>INTJ</option>
                <option id='INTP' value='INTP'>INTP</option>
                <option id='ESTP' value='ESTP'>ESTP</option>
                <option id='ESTJ' value='ESTJ'>ESTJ</option>
                <option id='ESFP' value='ESFP'>ESFP</option>
                <option id='ESFJ' value='ESFJ'>ESFJ</option>
                <option id='ENFP' value='ENFP'>ENFP</option>
                <option id='ENFJ' value='ENFJ'>ENFJ</option>
                <option id='ENTP' value='ENTP'>ENTP</option>
                <option id='ENTJ' value='ENTJ'>ENTJ</option>
              </select>

              <label for='enneagramSearch'>&emsp; Enneagram: </label>
              <select name='enneagramSearch' id='enneagramSearch' onChange={this.listingChange}
                defaultValue={this.state.trueValues[1]}>
                  <option id='NoneEn' value='NoneEn'>None selected</option>
                  <option id='1' value='1'>1</option>
                  <option id='2' value='2'>2</option>
                  <option id='3' value='3'>3</option>
                  <option id='4' value='4'>4</option>
                  <option id='5' value='5'>5</option>
                  <option id='6' value='6'>6</option>
                  <option id='7' value='7'>7</option>
                  <option id='8' value='8'>8</option>
                  <option id='9' value='9'>9</option>
              </select>
              </p>

              {this.displayChanges()}

              <div>
                <button type="submit" className="link-button2">
                  Submit Changes
                </button>
              </div>
            </form>
    
            <p>
              <Link to="/search">
                <button className="link-button2">Back to Search Home</button>
              </Link>
              <Link to="/search/personal_info">
                <button className="link-button2">Next Search Section</button>
              </Link>
            </p>
          </div>
        );
      }
}

export default SearchPersonalityForm;