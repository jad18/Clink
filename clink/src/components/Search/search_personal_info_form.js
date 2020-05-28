import React from 'react';
import {Link} from 'react-router-dom';

class SearchPersonalInfoForm extends React.Component
{
    constructor()
    {
        super();

        sessionStorage.setItem("lastValidPage", "/search/personal_info");

        this.state = {
            hasChanges: false,
            trueValues: JSON.parse(sessionStorage.getItem("profile_personalInfo")),
        };

        this.submitForm = this.submitForm.bind(this);
        this.displayChanges = this.displayChanges.bind(this);
        this.listingChange = this.listingChange.bind(this);
    }

    
    
    submitForm(event) {
        event.preventDefault();
    
        if (this.state.hasChanges)
        {
            this.setState({
                hasChanges: false,
            });

            var trueEntries = [document.getElementById('schoolYearSearch').value,
                            document.getElementById('religionSearch').value,
                            document.getElementById('genderSearch').value];
          
            console.log(trueEntries);
            
    
            sessionStorage.setItem(
                "search_personalInfo",
                JSON.stringify(trueEntries)
            );

            let searchList = JSON.parse(sessionStorage.getItem("searchList"));
            searchList.push("personalInfo");
            sessionStorage.setItem("searchList", JSON.stringify(searchList));
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
              <label for='schoolYearSearch'>School Year: </label>
              <select name="schoolYearSearch" id="schoolYearSearch" onChange={this.listingChange}
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

              <label for='religionSearch'>&emsp; Religion: </label>
              <select name='religionSearch' id='religionSearch' onChange={this.listingChange}
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
              <label for='genderSearch'>&emsp; Gender: </label>
              <select name="genderSearch" id="genderSearch" onChange={this.listingChange}
                defaultValue={this.state.trueValues[2]}>
                <option id='NoneGender'value='NoneGender'>None selected</option>
                <option id='Male' value='Male'>Male</option>
                <option id='Female' value='Female'>Female</option>
                <option id='N/S' value='N/S'>Not Specified</option>
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
            </p>
          </div>
        );
      }
}

export default SearchPersonalInfoForm;