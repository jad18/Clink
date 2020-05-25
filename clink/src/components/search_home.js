import React from 'react';
import {Link} from 'react-router-dom';

function SearchHomePage() {
    sessionStorage.setItem("lastValidPage", "/search");

    return (
        <div className="App">
            <h2>Select which traits or preferences you'd like to see in a friend:</h2>

            <Link to='/change_profile/sports'>
                <button className="link-button2">Start from the beginning</button>
            </Link>

            <table id="profile-link-table">
                <tbody>
                <tr className='table-row'>
                    <td className='table-column'>
                        <Link to='/search'>
                            <button className='link-button3'>Sports</button>
                        </Link>
                    </td>
                    <td className='table-column'>
                        <Link to='/search'>
                            <button className='link-button3'>TV/Movies</button>
                        </Link>
                    </td>
                </tr>
                <tr className='table-row'>
                    <td className='table-column'>
                        <Link to='/search'>
                            <button className='link-button3'>Outdoor Activities</button>
                        </Link>
                    </td>
                    <td className='table-column'>
                        <Link to='/search'>
                            <button className='link-button3'>Indoor Activities</button>
                        </Link>
                    </td>
                </tr>
                <tr className='table-row'>
                    <td className='table-column'>
                        <Link to='/search'>
                            <button className='link-button3'>Cuisines</button>
                        </Link>
                    </td>
                    <td className='table-column'>
                        <Link to='/search'>
                            <button className='link-button3'>Arts and Media</button>
                        </Link>
                    </td>
                </tr>
                </tbody>
            </table>

            <p></p>
            <Link to='/'>
                <button className="link-button2">Back to Home</button>
            </Link>
        </div>
    );
}

export default SearchHomePage;