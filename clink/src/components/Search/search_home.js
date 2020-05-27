import React from 'react';
import {Link} from 'react-router-dom';

function extractListItems(list)
{
    let str = "";
    for(let i=0; i<list.length; i++)
    {
        if(i===list.length-1) str += list[i];
        else str += list[i] + ', ';

    }
    return str;
}


class SearchHomePage extends React.Component {
    constructor()
    {
        super();
        sessionStorage.setItem("lastValidPage", "/search");

        this.state = {
            requests: JSON.parse(sessionStorage.getItem("searchList")),
            errorMsg: ""
        };

        this.getRequests = this.getRequests.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.checkSearch = this.checkSearch.bind(this);
        this.search = this.search.bind(this);
        this.getErrorMsg = this.getErrorMsg.bind(this);
    }

    getRequests()
    {
        return(
            <div>
                <h2><u>Request List:</u></h2>
                <p className="about-page-para">
                    <strong>Sports: </strong> {extractListItems(JSON.parse(sessionStorage.getItem("search_sports")))}
                </p>
                <p className="about-page-para">
                    <strong>TV and Movies: </strong> {extractListItems(JSON.parse(sessionStorage.getItem("search_movies")))}
                </p>
                <p className="about-page-para">
                    <strong>Outdoor Activities: </strong> {extractListItems(JSON.parse(sessionStorage.getItem("search_outdoor")))}
                </p>
                <p className="about-page-para">
                    <strong>Indoor Activities: </strong> {extractListItems(JSON.parse(sessionStorage.getItem("search_indoor")))}
                </p>
                <p className="about-page-para">
                    <strong>Types of Food: </strong> {extractListItems(JSON.parse(sessionStorage.getItem("search_cuisines")))}
                </p>
                <p className="about-page-para">
                    <strong>Arts, Theater, and Media: </strong>{extractListItems(JSON.parse(sessionStorage.getItem("search_arts")))}
                </p>
            </div>
        );
    }

    clearSearch()
    {
        sessionStorage.setItem("searchList", "[]");
        sessionStorage.setItem("search_sports", "[]");
        sessionStorage.setItem("search_movies", "[]");
        sessionStorage.setItem("search_outdoor", "[]");
        sessionStorage.setItem("search_indoor", "[]");
        sessionStorage.setItem("search_cuisines", "[]");
        sessionStorage.setItem("search_arts", "[]");
        this.setState({ requests: [] });
    }

    checkSearch(reqList)
    {
        if(reqList.length === 0)
        {
            this.setState({errorMsg: "Don't forget to add to your request before you search!"})
        }
        else
        {
            this.search(reqList);
        }
    }

    search(reqList)
    {
        this.setState({ errorMsg: "Finding your matches..."});

        let request = reqList.reduce(
            (prevEntries, curEntry) =>
            ({
                ...prevEntries,
                [curEntry]: JSON.parse(sessionStorage.getItem("search_" + curEntry))
            }),
            {}
        );

        request["username"] = sessionStorage.getItem("username");

        console.log(request);
        var searchResult = this.makeSearchRequest(request); //returns a promise
        const self = this;
        let {history} = this.props;

        searchResult.then(function(result) {
        if(result===true)
        {
            self.setState({ errorMsg: ''});
            self.clearSearch();
            history.push('/feed');
        }
        else
        {
            self.setState({ errorMsg: "An error occurred when requesting from the server"});
        }
        })
    }

    async makeSearchRequest(request)
    {
        console.log(request);
        const options = {
        method: 'POST',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify(request)
        }

        try {
        const response = await fetch("http://[localhost]:3000/search", options) //change [localhost] to your local IP address
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

    getErrorMsg()
    {
        return(<p>{this.state.errorMsg}</p>);
    }

    render()
    {
    return (
        <div className="App">
            <h2>Select which traits or preferences you'd like to see in a friend:</h2>
            <h4>(All entries are in the same place as the Change Profile section so they're easier to find!)</h4>

            <p>
                <Link to='/search/sports'>
                    <button className="link-button2">Start from the beginning</button>
                </Link>
                <button className="link-button2" onClick={this.clearSearch}>Clear Entries</button>
            </p>

            <table id="profile-link-table">
                <tbody>
                <tr className='table-row'>
                    <td className='table-column'>
                        <Link to='/search/sports'>
                            <button className='link-button3'>Sports</button>
                        </Link>
                    </td>
                    <td className='table-column'>
                        <Link to='/search/movies'>
                            <button className='link-button3'>TV/Movies</button>
                        </Link>
                    </td>
                </tr>
                <tr className='table-row'>
                    <td className='table-column'>
                        <Link to='/search/outdoor_activities'>
                            <button className='link-button3'>Outdoor Activities</button>
                        </Link>
                    </td>
                    <td className='table-column'>
                        <Link to='/search/indoor_activities'>
                            <button className='link-button3'>Indoor Activities</button>
                        </Link>
                    </td>
                </tr>
                <tr className='table-row'>
                    <td className='table-column'>
                        <Link to='/search/cuisines'>
                            <button className='link-button3'>Types of Food</button>
                        </Link>
                    </td>
                    <td className='table-column'>
                        <Link to='/search/arts_and_media'>
                            <button className='link-button3'>Arts, Theater, and Media</button>
                        </Link>
                    </td>
                </tr>
                <tr className='table-row'>
                    <td className='table-column'>
                        <Link to='/search/cuisines'>
                            <button className='link-button3'>Personality</button>
                        </Link>
                    </td>
                    <td className='table-column'>
                        <Link to='/search/arts_and_media'>
                            <button className='link-button3'>Personal Information</button>
                        </Link>
                    </td>
                </tr>
                </tbody>
            </table>

            {this.getRequests()}
            <p>{this.getErrorMsg()}</p>

            <button className="link-button2" onClick={() => this.checkSearch(this.state.requests)}>
                <strong>Search</strong>
            </button>
        </div>
    );
    }
}

export default SearchHomePage;