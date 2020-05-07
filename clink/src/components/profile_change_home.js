import React from 'react';
import {Link} from 'react-router-dom';

const NextPage = () => {
    return (
        <>
        <div class="App">
            <h2>Choose a section of your profile to change:</h2>

            <table id="profile-link-table">
                <tr class='table-row'>
                    <td class='table-column'>
                        <Link to='/change_profile/sports'>
                            <button class='link-button3'>Sports</button>
                        </Link>
                    </td>
                    <td class='table-column'>This is number 2.</td>
                </tr>
                <tr class='table-row'>
                    <td class='table-column'>This is number 3.</td>
                    <td class='table-column'>This is number 4.</td>
                </tr>
                <tr class='table-row'>
                    <td class='table-column'>This is number 5.</td>
                    <td class='table-column'>This is number 6.</td>
                </tr>
            </table>

            <p></p>
            <Link to='/'>
                <button class="link-button2">Back to Home</button>
            </Link>
        </div>
        </>
    );
}

export default NextPage;