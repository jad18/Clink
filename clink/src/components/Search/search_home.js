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
            requests: JSON.parse(sessionStorage.getItem("searchList"))
        };

        this.getRequests = this.getRequests.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.search = this.search.bind(this);
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

    search(reqList)
    {
        let request = {};
        for(let i=0; i<reqList.length; i++)
        {
            request.item = JSON.parse(sessionStorage.getItem("search_" + reqList[i]));
            console.log(reqList[i], request.item);
        }
        alert(request);
        this.clearSearch();
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
                        <Link to='/search/outdoor'>
                            <button className='link-button3'>Outdoor Activities</button>
                        </Link>
                    </td>
                    <td className='table-column'>
                        <Link to='/search/indoor'>
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
                            <button className='link-button3'>Arts and Media</button>
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

            <p>
                {this.getRequests()}
            </p>

            
            <p><Link to='/feed'>
                <button className="link-button2" onClick={() => this.search(this.state.requests)}><strong>Search</strong></button>
            </Link></p>
        </div>
    );
    }
}

export default SearchHomePage;