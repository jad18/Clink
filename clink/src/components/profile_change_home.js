import React from 'react';
import {Link} from 'react-router-dom';

const NextPage = () => {
    return (
        <>
        <div class="App">
            This is the next page.
        </div>
        <Link to='/sports'>Sports</Link>
        </>
    );
}

export default NextPage;