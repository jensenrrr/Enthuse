import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PostCreate from "../dashboard/PostCreate";


class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const loggedOrNot = auth => {
      return auth.isAuthenticated ? (
        <nav className="z-depth-0">
          <div className="nav-wrapper">
            <Link
              to="/"
              className="logo"
            >
              Enthuse
            </Link>
            <ul
              id="nav-mobile"
              className="right hide-on-med-and-down black-text "
            >
              <li ><PostCreate /></li>
              <li >
                <a className="nav-items"
                  href="/profile"
                >
                  {this.props.auth.user.username}
                  </a>
              </li>

              <li >
                <a className="nav-items" href="/#" onClick={this.onLogoutClick}>Logout</a>
              </li>
            </ul>
          </div>
        </nav>

      ) : (
          <nav className="z-depth-0">
            <div className="nav-wrapper">
            <Link
              to="/landing"
              className="logo"
            >
              Enthuse
            </Link>
            </div>
          </nav>
        );
    };

    return <div className="navbar">{loggedOrNot(this.props.auth)}</div>;
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
