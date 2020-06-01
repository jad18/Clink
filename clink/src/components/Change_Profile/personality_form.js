import React from 'react';
import {Link} from 'react-router-dom';

class PersonalityForm extends React.Component
{
    constructor()
    {
        super();

        sessionStorage.setItem("lastValidPage", "/change_profile/personality");

        this.state = {
            hasChanges: false,
            trueValues: JSON.parse(sessionStorage.getItem("profile_personality"))
        };

        this.submitForm = this.submitForm.bind(this);
        this.makeChangeRequest = this.makeChangeRequest.bind(this);
        this.contactServer = this.contactServer.bind(this);
        this.displayChanges = this.displayChanges.bind(this);
        this.listingChange = this.listingChange.bind(this);
    }

    
    
    submitForm(event) {
        event.preventDefault();
    
        if (this.state.hasChanges)
        {
            var trueEntries = [document.getElementById('myers-briggs').value,
                            document.getElementById('enneagram').value];
          
            console.log(trueEntries);
    
            this.makeChangeRequest(trueEntries);
        }
    }

    makeChangeRequest(trueEntries)
    {
        var request = {"email": sessionStorage.getItem("username"),
                       "section": "personality",
                       "list": trueEntries};

        console.log(request);

        var postResult = this.contactServer(request); //returns a promise

        var self = this;
        postResult.then(function(result) {
        if(result)
        {
            self.setState({hasChanges: false});
            sessionStorage.setItem("profile_personality", JSON.stringify(trueEntries));
        }
        else
            alert("Your change could not be received by the server. Please check your connection and resubmit.");
        })
    }

    async contactServer(request)
    {
        const options = {
        method: 'POST',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify(request)
        }

        try {
        const response = await fetch("http://" + sessionStorage.getItem('local-ip') + ":3000/change_profile", options)
        if(!response.ok)
        {
            console.log(response.statusText);
            return null;
        }
        const jsonData = await response.json();
        return jsonData;
        } catch(error) {
            console.log(error);
            return null;
        }
    }

    displayChanges() {
        if (this.state.hasChanges)
          return <p>Don't forget to save your changes below:</p>;
        else return <p>Your profile is up-to-date.</p>;
    }

    listingChange()
    {
        this.setState({hasChanges: true});
    }
   

    render() {
        return (
          <div>
            <div className="App">
              <h1>Your Personality</h1>
              <h4 className='about-page-para'>
                These personality metrics are a great way to match up with like-minded
                people. If you don't know what type you are, don't worry: these are optional.
              </h4>
            </div>
    
            <form onSubmit={this.submitForm} className="form-body">
              
              <p>
              <label for='myers-briggs'>Myers Briggs: </label>
              <select name="myers-briggs" id="myers-briggs" onChange={this.listingChange}
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

              <label for='enneagram'>&emsp; Enneagram: </label>
              <select name='enneagram' id='enneagram' onChange={this.listingChange}
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
              <Link to="/change_profile">
                <button className="link-button2">Back to Profile Change</button>
              </Link>
              <Link to="/change_profile/personal_info">
                <button className="link-button2">Next Profile Section</button>
              </Link>
            </p>
          </div>
        );
      }
}

export default PersonalityForm;