import React from "react";
import { Link } from "react-router-dom";
import FormButton from "./form_button.js";

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

    this.state = {
      entries: props.entries.reduce(
        (prevEntries, curEntry) => ({
          ...prevEntries,
          [curEntry]: hasTrueValue(props.trueEntries, curEntry),
        }),
        {}
      ),

      numEntries: props.trueEntries.length,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange = (event) => {
    const { value } = event.target;
    const isChecked = this.state.entries[value];

    if (this.state.numEntries !== this.maxEntries || isChecked) {
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
    Object.keys(this.state.entries)
      .filter((checkbox) => this.state.entries[checkbox])
      .forEach((checkbox) => {
        alert(checkbox, "is selected.");
      });
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
  //makeCheckboxes2() {
  //var needsRowDiv = false;
  /* const func1 = this.makeCheckbox;
        const func2 = this.handleChange;
        const entries = this.state.entries;
        const thisComp = this;*/
  // var elementArr = [];

  /*return (
            Object.keys(this.state.entries).map(function(key, index) {
                needsRowDiv = !needsRowDiv
                return this.makeCheckbox(key, needsRowDiv)
            }, this)
        )*/
  //Object.keys(this.state.entries)
  //    .forEach(key => {
  //        elementArr.push(this.makeCheckbox(key, needsRowDiv));
  //        needsRowDiv = !needsRowDiv;
  //    })
  //return(elementArr);
  //}

  makeCheckboxes() {
    //Want to start of with isFirstKey=true and numEntriesLeft=this.totalOptions,
    //but must change each of these once first --> intentionally flip isFirstKey
    //and add one to numEntriesLeft
    var firstKey,
      isFirstKey = false;
    var numEntriesLeft = this.totalOptions + 1;

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

    /*
            result += "<div className='form-column'> <p><FormButton value='" +
                      key + "' isChecked={this.state.entries['" + key +
                      "']} onChange={this.handleChange} /></p> </div>";
            
            if(needsRowDiv) result += "</div>";

        //Special case: odd number of entries
        if(!needsRowDiv) result += "</div>";


        console.log(result);

        var formDiv = document.createElement('div');
        formDiv.innerHTML = result;
        return (formDiv);
*/
    //document.getElementById("formops").innerHTML = result;

    //return(<div>{result}</div>);
    /*
        return (
            <>
                <div className='form-row'>
                <div className='form-column'>
                <p><FormButton value='Football' isChecked={this.state.entries['Football']} onChange={this.handleChange} /></p>
                </div>
    
                <div className='form-column'>
                <p><FormButton value='Soccer' isChecked={this.state.entries['Soccer']} onChange={this.handleChange} /></p>
                </div>
                </div>
      
                <div className='form-row'>
                <div className='form-column'>
                <p><FormButton value='a' isChecked={this.state.entries['a']} onChange={this.handleChange} /></p>
                </div>
    
                <div className='form-column'>
                <p><FormButton value='b' isChecked={this.state.entries['b']} onChange={this.handleChange}/></p>
                </div>
                </div>
    
                <div className='form-row'>
                <div className='form-column'>
                <p><FormButton value='c' isChecked={this.state.entries['c']} onChange={this.handleChange}/></p>
                </div>
    
                <div className='form-column'>
                <p><FormButton value='d' isChecked={this.state.entries['d']} onChange={this.handleChange}/></p>
                </div>
                </div>
    
                <div className='form-row'>
                <div className='form-column'>
                <p><FormButton value='e' isChecked={this.state.entries['e']} onChange={this.handleChange}/></p>
                </div>
    
                <div className='form-column'>
                <p><FormButton value='f' isChecked={this.state.entries['f']} onChange={this.handleChange}/></p>
                </div>
                </div>
    
                <div className='form-row'>
                <div className='form-column'>
                <p><FormButton value='g' isChecked={this.state.entries['g']} onChange={this.handleChange}/></p>
                </div>
    
                <div className='form-column'>
                <p><FormButton value='h' isChecked={this.state.entries['h']} onChange={this.handleChange}/></p>
                </div>
                </div>
            </>
        );*/
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
          <Link to="/">
            <button className="link-button2">Next Profile Section</button>
          </Link>
        </p>
      </div>
    );
  }
}

export default GeneralForm;
