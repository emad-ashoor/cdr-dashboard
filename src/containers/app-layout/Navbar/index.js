import React from 'react';
import './index.css';

class Navbar extends React.Component {
    render() {
        return (
            <div className="ei-navbar">
                {/* <a href="/dashboard" className="ei-btn">dashboard</a>
                <a href="/base-data" className="ei-btn">Base info</a> */}
                <div className="user-welcome">
                    Dear user, welcome to CDR dashboard
                </div>
            </div>
        );
    }
}
    
export default Navbar;