import React from 'react';
import './index.css';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="ei-sidebar" tabIndex="0">
          <div className="ei-hamburger"></div>
          <div className="ei-sidebar-section ei-sidebar-title">
            CDR Reports
          </div>
          <div className="ei-sidebar-section">
            {/* <img src={require("../../../assets/images/" + window.CUSTOMER_LOGO)} alt="Logo" /> */}
            <img src={process.env.PUBLIC_URL + '/Logo.png'} alt="Logo" />            
            { window.CUSTOMER_NAME }
          </div>
          {/* <div className="ei-btn-list">
            <a href="/dashboard" className="ei-btn">Dashboard</a>
            <a href="/base-data" className="ei-btn">Base Info</a>
          </div> */}
      </div>
    );
  }
}

export default Sidebar;