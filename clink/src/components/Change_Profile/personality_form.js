import React from 'react';
import {Link} from 'react-router-dom';

class PersonalityForm extends React.Component
{
    constructor()
    {
        super();

        this.state = {
            hasChanges: false,
            trueValues: JSON.parse(sessionStorage.getItem("profile_personality"))
        };

        this.submitForm = this.submitForm.bind(this);
        this.displayChanges = this.displayChanges.bind(this);
        this.listingChange = this.listingChange.bind(this);
        this.getMBSelected = this.getMBSelected.bind(this);
        this.getEnSelected = this.getEnSelected.bind(this);
    }

    
    
    submitForm(event) {
        event.preventDefault();
    
        if (this.state.hasChanges)
        {
            this.setState({ hasChanges: false });
            var trueEntries = [document.getElementById('myers-briggs').value,
                            document.getElementById('enneagram').value];
          
            console.log(trueEntries);
    
            sessionStorage.setItem(
                "profile_personality",
                JSON.stringify(trueEntries)
          );
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

    getMBSelected(item)
    {
        if(item === this.state.trueValues[0]) return "selected";
        else return null;
    }

    getEnSelected(item)
    {
        if(item === this.state.trueValues[1]) return "selected";
        else return null;
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
              <select name="myers-briggs" id="myers-briggs" onChange={this.listingChange}>
                <option id='NoneMB'value='NoneMB'>None selected</option>
                <option id='ISTJ' value='ISTJ' selected={this.getMBSelected('ISTJ')}>ISTJ</option>
                <option id='ISTP' value='ISTP' selected={this.getMBSelected('ISTP')}>ISTP</option>
                <option id='ISFJ' value='ISFJ' selected={this.getMBSelected('ISFJ')}>ISFJ</option>
                <option id='ISFP' value='ISFP' selected={this.getMBSelected('ISFP')}>ISFP</option>
                <option id='INFJ' value='INFJ' selected={this.getMBSelected('INFJ')}>INFJ</option>
                <option id='INFP' value='INFP' selected={this.getMBSelected('INFP')}>INFP</option>
                <option id='INTJ' value='INTJ' selected={this.getMBSelected('INTJ')}>INTJ</option>
                <option id='INTP' value='INTP' selected={this.getMBSelected('INTP')}>INTP</option>
                <option id='ESTP' value='ESTP' selected={this.getMBSelected('ESTP')}>ESTP</option>
                <option id='ESTJ' value='ESTJ' selected={this.getMBSelected('ESTJ')}>ESTJ</option>
                <option id='ESFP' value='ESFP' selected={this.getMBSelected('ESFP')}>ESFP</option>
                <option id='ESFJ' value='ESFJ' selected={this.getMBSelected('ESFJ')}>ESFJ</option>
                <option id='ENFP' value='ENFP' selected={this.getMBSelected('ENFP')}>ENFP</option>
                <option id='ENFJ' value='ENFJ' selected={this.getMBSelected('ENFJ')}>ENFJ</option>
                <option id='ENTP' value='ENTP' selected={this.getMBSelected('ENTP')}>ENTP</option>
                <option id='ENTJ' value='ENTJ' selected={this.getMBSelected('ENTJ')}>ENTJ</option>
              </select>

              <label for='enneagram'>&emsp; Enneagram: </label>
              <select name='enneagram' id='enneagram' onChange={this.listingChange}>
                  <option id='NoneEn' value='NoneEn'>None selected</option>
                  <option id='1' value='1' selected={this.getEnSelected('1')}>1</option>
                  <option id='2' value='2' selected={this.getEnSelected('2')}>2</option>
                  <option id='3' value='3' selected={this.getEnSelected('3')}>3</option>
                  <option id='4' value='4' selected={this.getEnSelected('4')}>4</option>
                  <option id='5' value='5' selected={this.getEnSelected('5')}>5</option>
                  <option id='6' value='6' selected={this.getEnSelected('6')}>6</option>
                  <option id='7' value='7' selected={this.getEnSelected('7')}>7</option>
                  <option id='8' value='8' selected={this.getEnSelected('8')}>8</option>
                  <option id='9' value='9' selected={this.getEnSelected('9')}>9</option>
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
              <Link to={this.nextPageLink}>
                <button className="link-button2">Next Profile Section</button>
              </Link>
            </p>
          </div>
        );
      }
}

export default PersonalityForm;