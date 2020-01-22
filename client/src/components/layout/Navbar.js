import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const loggedOrNot = auth => {
      return auth.isAuthenticated ? (
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s4 brand-logo center black-text"
            >
              <i className="material-icons">code</i>
              Enthuse
            </Link>
            <ul
              id="nav-mobile"
              className="right hide-on-med-and-down black-text "
            >
              <li className="black-text" style={{ marginRight: "5px" }}>
                <a
                  href="/profile"
                  style={{ marginRight: "5px", color: "black" }}
                >
                  {this.props.auth.user.username}
                </a>
              </li>
              <li className="blue lighten-1" onClick={this.onLogoutClick}>
                Logout
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/landing"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">code</i>
              Enthuse
            </Link>
          </div>
        </nav>
      );
    };

    return <div className="navbar-fixed">{loggedOrNot(this.props.auth)}</div>;
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
