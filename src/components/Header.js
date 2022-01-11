import React from 'react'

const Header = (props) => {
    const { text } = props;

    return (
        <header style={{ backgroundColor: "rgba(0,0,0,0.4)", color: "#ff6a95" }}>
            <div className="container">
                <h2>{text}</h2>
            </div>
        </header>
    )
}

Header.defaultProps = {
    text: "Feedback UI" // ako nije poslat props
}

export default Header
