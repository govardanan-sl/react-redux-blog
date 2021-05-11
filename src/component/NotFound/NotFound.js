import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFound extends Component {
    render() {
        return (
            <div className="not-found">
                <h2>Broken Link</h2>
                <p>The Page you requested not found</p>
                <Link to = '/react-blog-test-v2'className="link-highlight">Home</Link>
            </div>
        )
    }
}

export default NotFound;
