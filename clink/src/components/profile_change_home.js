import React from 'react';
import {Link} from 'react-router-dom';

const ChangeProfilePage = () => {
    return (
        <div className="App">
            <h2>Choose a section of your profile to change:</h2>

            <Link to='/change_profile/sports'>
                <button className="link-button2">Start from the beginning</button>
            </Link>

            <table id="profile-link-table">
                <tr className='table-row'>
                    <td className='table-column'>
                        <Link to='/change_profile/sports'>
                            <button className='link-button3'>Sports</button>
                        </Link>
                    </td>
                    <td className='table-column'>This is number 2.</td>
                </tr>
                <tr className='table-row'>
                    <td className='table-column'>This is number 3.</td>
                    <td className='table-column'>This is number 4.</td>
                </tr>
                <tr className='table-row'>
                    <td className='table-column'>This is number 5.</td>
                    <td className='table-column'>This is number 6.</td>
                </tr>
            </table>

            <p></p>
            <Link to='/'>
                <button className="link-button2">Back to Home</button>
            </Link>
        </div>
    );
}

export default ChangeProfilePage;