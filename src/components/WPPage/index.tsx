import React from 'react';

// TODO: Add classname and other props from WP meta tags
// Set up each page

const WPPage: React.FC = (props) => {
    return (
        <div>
            {props.children}
        </div>
    );
}

export default WPPage;