import React from 'react';
import {Link} from 'react-router-dom';

const AboutPage = () => {
    return (
        <div className="App">
            <h1>About Clink</h1>
            <p className="about-page-para">
            With the current pandemic, students have found it increasingly difficult to meet new
            friends from their college. Most of them have returned to their hometowns, which range
            from just minutes away from campus to across the globe. In the era of social distancing,
            social interaction with peers has plummeted, leaving students with little opportunity to
            communicate with others from their university. At the same time, social media has become
            immensely focused on image, creating a barrier for people who would like to meet genuine
            friends.
            </p>
            <p className="about-page-para">
            The solution to these amassing problems is a way to anonymously meet new people from your
            college -- Clink. By simply checking a few boxes, students are able to find others who share
            their same interests and get in touch with them, all without threatening their privacy. Plus,
            the interface is specifically designed to be clean and straightforward, providing users with
            a hassle-free experience.
            </p>
            <p className="about-page-para">
            Looking to meet some new friends from college while stuck inside? Sign up now and be searching
            in minutes.
            </p>

            <Link to='/signup'>
                <button className="link-button2">Sign Up</button>
            </Link>
        </div>
    );
}

export default AboutPage;