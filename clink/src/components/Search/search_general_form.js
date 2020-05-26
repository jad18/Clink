import React from 'react';
import {Link} from 'react-router-dom';
import FormButton from '../form_button.js';


function hasTrueValue(trueValues, value)
{
    for(let i=0; i<trueValues.length; i++)
    {
        if(trueValues[i]===value) return true;
    }
    return false;
}

class SearchGeneralForm extends React.Component {
    constructor(props)
    {
        super(props);

        this.maxEntries = props.maxEntries;
        this.totalOptions = props.entries.length;
        this.title = props.title;
        this.searchType = props.searchType;
        this.nextPageLink = props.nextPageLink;

        this.state = {
            entries: props.entries.reduce(
                (prevEntries, curEntry) =>
                ({
                    ...prevEntries,
                    [curEntry]: hasTrueValue(props.trueEntries, curEntry)
                }),
                {}
            ),
            
            hasChanges: false,
            numEntries: props.trueEntries.length
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.makeOneCheckbox = this.makeOneCheckbox.bind(this);
        this.makeTwoCheckboxes = this.makeTwoCheckboxes.bind(this);
        this.makeCheckboxes = this.makeCheckboxes.bind(this);
        this.displayChanges = this.displayChanges.bind(this);
    }

    handleChange = event =>
    {
        const {value} = event.target;
        const isChecked = this.state.entries[value];

        if(this.state.numEntries !== this.maxEntries || isChecked)
        {
            let changeAmt = 1;
            if(isChecked) changeAmt = -1;

            this.setState(prevState => ({
                numEntries: this.state.numEntries+changeAmt,
                hasChanges: true,
                entries: {
                    ...prevState.entries,
                    [value]: !prevState.entries[value]
                }
            }));
        }
    }

    submitForm(event)
    {
        event.preventDefault();

        this.setState({ hasChanges: false });
        var trueEntries = [];
        event.preventDefault();
        Object.keys(this.state.entries)
            .filter(checkbox => this.state.entries[checkbox])
            .forEach(checkbox => {
            trueEntries.push(checkbox);
      });

      alert(trueEntries);
      sessionStorage.setItem("search_" + this.searchType, JSON.stringify(trueEntries));

      let searchList = JSON.parse(sessionStorage.getItem("searchList"));
      searchList.push(this.searchType);
      sessionStorage.setItem("searchList", JSON.stringify(searchList));
    }


    makeOneCheckbox(key)
    {
        return (
            <div className = "form-row">
                <div className="form-column">
                    <p><FormButton value={key}
                                   isChecked={this.state.entries[key]}
                                   onChange={this.handleChange} />
                    </p>
                </div>
                <div className="form-column"></div>
            </div>
        );
    }

    
    makeTwoCheckboxes(key1, key2) {
        return (
            <div className = "form-row">
                <div className="form-column">
                    <p><FormButton value={key1}
                                   isChecked={this.state.entries[key1]}
                                   onChange={this.handleChange} />
                    </p>
                </div>
                <div className="form-column">
                    <p><FormButton value={key2}
                                   isChecked={this.state.entries[key2]}
                                   onChange={this.handleChange} />
                    </p>
                </div>
            </div>
        );
    }


    makeCheckboxes()
    {
        //Want to start of with isFirstKey=true, but must change this
        //this once first because region below returns is unreachable
        // --> intentionally flip isFirstKey
        var firstKey, isFirstKey = false;
        var numEntriesLeft = this.totalOptions;

        return(
            Object.keys(this.state.entries).map(function(key, index)
            {
                isFirstKey = !isFirstKey;

                if(numEntriesLeft === 1)
                {
                    numEntriesLeft--;
                    return this.makeOneCheckbox(key);
                }
                else if(isFirstKey)
                {
                    firstKey = key;
                    return(<div></div>);
                }
                else
                {
                    numEntriesLeft -= 2;
                    return this.makeTwoCheckboxes(firstKey, key);
                }
            }, this)
        );
    }

    displayChanges()
    {
        if(this.state.hasChanges)
            return(<p>Don't forget to save your changes below:</p>);
        else
            return(<p>Your request is up-to-date.</p>);
    }

    render()
    {
        return (
            <div>
            <div className="App">
                <h1>{this.title}</h1>
                <h4>
                    Choose what you're looking for (up to {this.maxEntries} selections):
                </h4>
                <p>
                    (Note: You must hit the 'Submit Changes' button to confirm any changes)
                </p>
            </div>
            <form onSubmit={this.submitForm} className="form-body">
                {this.makeCheckboxes()}
                {this.displayChanges()}
                <div>
                    <button type="submit" className='link-button2'>
                        Submit Changes
                    </button>
                </div>
      
            </form>
    
            <p>
                <Link to='/search'>
                    <button className="link-button2">Back to Search Home</button>
                </Link>
                <Link to={this.nextPageLink}>
                    <button className="link-button2">Next Search Section</button>
                </Link>
            </p>
            </div>
        );
    }
}

export default SearchGeneralForm;