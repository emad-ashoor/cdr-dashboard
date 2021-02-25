// node libraries
import React from "react";
import { connect } from "react-redux";

// container Page

// css
import Version from "../../version/version.json";

class Login extends React.Component {
    render() {
        return (
            <div>
                <div>Login Page</div>
                <div>Vesion : {Version.current}</div>
            </div>
        );
    }
}

const mapStateToProps = ({ status }) => ({ status });

export default connect(
    mapStateToProps,
    null
)(Login);