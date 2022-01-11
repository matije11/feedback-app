import React from 'react';
import Card from '../components/shared/Card';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <Card>
            <h1>About This Project</h1>
            <p>Something about this project.</p>
            <p>Version 1.0.0</p>

            <p><Link to='/'>Back To Home</Link></p>
        </Card>
    )
}

export default AboutPage
