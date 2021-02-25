// node libraries
import React, { Fragment } from 'react';

// containers & components
import EiNavbar from './Navbar';
import EiSidebar from './Sidebar';
import PanelRoutes from './Routes';

// styles
import './index.css'

class AppLayout extends React.Component {
  render() {
    return (
      <Fragment >
        <div className="ei-container">
          <EiNavbar />
          <EiSidebar />
          <div className="ei-content">
            <PanelRoutes />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default (AppLayout);