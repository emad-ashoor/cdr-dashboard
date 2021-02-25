import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import NotFoundPage from '../../components/pages/NotFoundPage';
import Login from '../login';
import Dashboard from '../dashboard';

class PanelRoutes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasToken: true
        }
    }

    render() {
        const { hasToken } = this.state;
        return (
            <Router>
                <Switch>
                    <Route path="/" exact={true} render={ () => hasToken ? <Redirect to="/dashboard" /> : <Login /> } />
                    <Route path="/dashboard" exact={true} component={Dashboard} />

                    <Route exact={true} component={NotFoundPage} />
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = ({ status }) => ({ status });

export default connect(
    mapStateToProps
)(PanelRoutes);