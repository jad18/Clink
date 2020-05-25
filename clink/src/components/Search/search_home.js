import React from 'react';
import {Link} from 'react-router-dom';


class SearchHomePage extends React.Component {
    constructor()
    {
        super();
        sessionStorage.setItem("lastValidPage", "/search");

        this.state = {searchUnresolved: true};//JSON.parse(sessionStorage.getItem("searchUnresolved"))};

        this.getUnresolved = this.getUnresolved.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }

    getUnresolved()
    {
        if (this.state.searchUnresolved)
        {
            return(
                <p className="about-page-para">
                    You have made changes to your search preferences but haven't hit search yet.
                    To save you some trouble, we kept your preferences around in case you still
                    wanted them. If you instead wanted to get rid of them, please press the 'Clear
                    Entries' button below.
                </p>
            
            );
        }
        else return(<div></div>);
    }

    clearSearch()
    {
        sessionStorage.setItem("searchUnresolved", "false");
        sessionStorage.setItem("searchList", "[]");
        this.setState({searchUnresolved: false});
    }

    render()
    {
    return (
        <div className="App">
            <h2>Select which traits or preferences you'd like to see in a friend:</h2>
            <h4>(Everything is in the same place so it's easier to find!)</h4>

            {this.getUnresolved()}

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

            <Link to='/'>
                <button className="link-button2"><strong>Search</strong></button>
            </Link>
        </div>
    );
    }
}

export default SearchHomePage;