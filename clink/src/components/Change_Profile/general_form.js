import React from "react";
import { Link } from "react-router-dom";
import FormButton from "../form_button.js";

function hasTrueValue(trueValues, value) {
  for (let i = 0; i < trueValues.length; i++) {
    if (trueValues[i] === value) return true;
  }
  return false;
}

class GeneralForm extends React.Component {
  constructor(props) {
    super(props);

    this.maxEntries = props.maxEntries;
    this.totalOptions = props.entries.length;
    this.title = props.title;
    this.profileType = props.profileType;
    this.nextPageLink = props.nextPageLink;
    this.originalTrueEntries = props.trueEntries;

    this.state = {
      entries: props.entries.reduce(
        (prevEntries, curEntry) => ({
          ...prevEntries,
          [curEntry]: hasTrueValue(props.trueEntries, curEntry),
        }),
        {}
      ),

      hasChanges: false,
      numEntries: props.trueEntries.length,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.makeOneCheckbox = this.makeOneCheckbox.bind(this);
    this.makeTwoCheckboxes = this.makeTwoCheckboxes.bind(this);
    this.makeCheckboxes = this.makeCheckboxes.bind(this);
    this.displayChanges = this.displayChanges.bind(this);
  }

  handleChange = (event) => {
    const { value } = event.target;
    const isChecked = this.state.entries[value];

    if (this.state.numEntries !== this.maxEntries || isChecked) {
      this.setState({ hasChanges: true });
      let changeAmt = 1;
      if (isChecked) changeAmt = -1;

      this.setState((prevState) => ({
        numEntries: this.state.numEntries + changeAmt,
        entries: {
          ...prevState.entries,
          [value]: !prevState.entries[value],
        },
      }));
    }
  };

  submitForm(event) {
    event.preventDefault();

    if (this.state.hasChanges) {
      this.setState({ hasChanges: false });
      var trueEntries = [];
      Object.keys(this.state.entries)
        .filter((checkbox) => this.state.entries[checkbox])
        .forEach((checkbox) => {
          trueEntries.push(checkbox);
        });

      sessionStorage.setItem(
        "profile_" + this.profileType,
        JSON.stringify(trueEntries)
      );
    }
  }

  makeOneCheckbox(key) {
    return (
      <div className="form-row">
        <div className="form-column">
          <p>
            <FormButton
              value={key}
              isChecked={this.state.entries[key]}
              onChange={this.handleChange}
            />
          </p>
        </div>
        <div className="form-column"></div>
      </div>
    );
  }

  makeTwoCheckboxes(key1, key2) {
    return (
      <div className="form-row">
        <div className="form-column">
          <p>
            <FormButton
              value={key1}
              isChecked={this.state.entries[key1]}
              onChange={this.handleChange}
            />
          </p>
        </div>
        <div className="form-column">
          <p>
            <FormButton
              value={key2}
              isChecked={this.state.entries[key2]}
              onChange={this.handleChange}
            />
          </p>
        </div>
      </div>
    );
  }

  makeCheckboxes() {
    //Want to start of with isFirstKey=true, but must change this
    //this once first because region below returns is unreachable
    // --> intentionally flip isFirstKey
    var firstKey,
      isFirstKey = false;
    var numEntriesLeft = this.totalOptions;

    return Object.keys(this.state.entries).map(function (key, index) {
      isFirstKey = !isFirstKey;

      if (numEntriesLeft === 1) {
        numEntriesLeft--;
        return this.makeOneCheckbox(key);
      } else if (isFirstKey) {
        firstKey = key;
        return <div></div>;
      } else {
        numEntriesLeft -= 2;
        return this.makeTwoCheckboxes(firstKey, key);
      }
    }, this);
  }

  displayChanges() {
    if (this.state.hasChanges)
      return <p>Don't forget to save your changes below:</p>;
    else return <p>Your profile is up-to-date.</p>;
  }

  render() {
    return (
      <div>
        <div className="App">
          <h1>{this.title}</h1>
          <h4>
            Choose your preferences out of the following (up to{" "}
            {this.maxEntries} selections):
          </h4>
        </div>

        <form onSubmit={this.submitForm} className="form-body">
          {this.makeCheckboxes()}
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

export default GeneralForm;

/* 
<form onSubmit={this.submitForm} className="form-body">
                {this.makeCheckboxes()}
                {this.displayChanges()}
                
                <button type="button" onClick={this.resetChanges} className='link-button2'>Reset Changes</button>
                

                <p>
                
                    <Link to="/change_profile"><button type="submit" className="link-button2">
                        Back to Profile Change
                    </button></Link>

                    <button type="submit" onClick={() => window.location = this.nextPageLink} className="link-button2">
                        Next Profile Section
                    </button>
                </p>
      
            </form>


//If user leaves without saving changes, autosave these changes
    componentWillUnmount()
    {
        if(this.state.hasChanges)
        {
            var trueEntries = [];
            Object.keys(this.state.entries)
                .filter(checkbox => this.state.entries[checkbox])
                .forEach(checkbox => {
                trueEntries.push(checkbox);
            });

            alert(trueEntries);
            alert("This is unmounting");
            sessionStorage.setItem("profile_" + this.profileType, JSON.stringify(trueEntries));
        }
    }

    resetChanges()
    {
        let newEntries={};
        Object.keys(this.state.entries).forEach(key =>
            newEntries[key] = hasTrueValue(this.originalTrueEntries, key));

        if(this.state.hasChanges)
        {
            this.setState({
                entries: newEntries,
                hasChanges: false,
                numEntries: this.originalTrueEntries.length
            });

        }
    }
*/
