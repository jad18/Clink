import React from 'react';
import {Link} from 'react-router-dom';

class PersonalInfoForm extends React.Component
{
    constructor()
    {
        super();

        sessionStorage.setItem("lastValidPage", "/change_profile/personal_info");

        this.state = {
            hasChanges: false,
            trueValues: JSON.parse(sessionStorage.getItem("profile_personalInfo")),
            bio: sessionStorage.getItem("bio")
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
            this.setState({
                bio: document.getElementById("bio").value
            });

            var trueEntries = [document.getElementById('schoolYear').value,
                            document.getElementById('religion').value,
                            document.getElementById('gender').value];
          
            console.log(trueEntries);
            console.log(document.getElementById('bio').value);
    
            this.makeChangeRequest(trueEntries, document.getElementById('bio').value);
        }
    }

    makeChangeRequest(trueEntries, bio)
    {
        var request = {"username": sessionStorage.getItem("username"),
                       "personalInfo": trueEntries,
                       "bio": bio};

        console.log(request);

        var postResult = this.contactServer(request); //returns a promise

        var self = this;
        postResult.then(function(result) {
        if(result)
        {
            self.setState({hasChanges: false});
            sessionStorage.setItem("profile_personalInfo", JSON.stringify(trueEntries));
            sessionStorage.setItem("bio", bio);
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
        const response = await fetch("http://[localhost]:3000/change_profile", options) //change [localhost] to your local IP address
        if(!response.ok)
        {
            alert(response.statusText);
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
          <div className="App">
           
            <h1>Personal Information</h1>
    
            <form onSubmit={this.submitForm} className="form-body">
              
              <p>
              <label for='schoolYear'>School Year: </label>
              <select name="schoolYear" id="schoolYear" onChange={this.listingChange}
                defaultValue={this.state.trueValues[0]}>
                <option id='NoneYear'value='NoneYear'>None selected</option>
                <option id='First' value='First'>
                    First Year
                </option>
                <option id='Second' value='Second'>
                    Second Year
                </option>
                <option id='Third' value='Third'>
                    Third Year
                </option>
                <option id='Fourth' value='Fourth'>
                    Fourth Year
                </option>
                <option id='Fifth' value='Fifth'>
                    Fifth Year
                </option>
                
              </select>

              <label for='religion'>&emsp; Religion: </label>
              <select name='religion' id='religion' onChange={this.listingChange}
                defaultValue={this.state.trueValues[1]}>
                    <option id='NoneReligion' value='NoneReligion'>None selected</option>
                    <option id='Christianity' value='Christianity'>
                        Christianity
                    </option>
                    <option id='Islam' value='Islam'>
                        Islam
                    </option>
                    <option id='Hinduism' value='Hinduism'>
                        Hinduism
                    </option>
                    <option id='Buddhism' value='Buddhism'>
                        Buddhism
                    </option>
                    <option id='Judaism' value='Judaism'>
                        Judaism
                    </option>
                    <option id='Confucianism' value='Confucianism'>
                        Confucianism
                    </option>
                    <option id='Taoism' value='Taoism'>
                        Taoism
                    </option>
                    <option id='Atheist' value='Atheist'>
                        Atheist
                    </option>
                    <option id='Agnostic' value='Agnostic'>
                        Agnostic
                    </option>
              </select>
              </p>

              <p>
              <label for='gender'>&emsp; Gender: </label>
              <select name="gender" id="gender" onChange={this.listingChange}
                defaultValue={this.state.trueValues[2]}>
                <option id='NoneGender'value='NoneGender'>None selected</option>
                <option id='Male' value='Male'>Male</option>
                <option id='Female' value='Female'>Female</option>
                <option id='N/S' value='N/S'>Not Specified</option>
              </select>
              </p>

              <br />

              <h4 className='about-page-para'>
                  Got anything else that you'd like to share? Add a short bio about
                  yourself so that people can really know who you are!
              </h4>
              <textarea name='bio' id='bio' rows='7' cols='80' maxLength="300"
                placeholder="Write about yourself!"
                onKeyDown={() => this.setState({hasChanges: true})}
                defaultValue={this.state.bio}>
                </textarea>



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
            </p>
          </div>
        );
      }
}

export default PersonalInfoForm;