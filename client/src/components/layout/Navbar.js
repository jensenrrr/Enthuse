import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PostCreate from "../dashboard/PostCreate";
import Settings from "../dashboard/Settings";

class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  stopNav = (e) => {
    e.preventDefault();
  };

  render() {
    const loggedOrNot = (auth) => {
      return auth.isAuthenticated ? (
        <nav className="z-depth-0">
          <div className="nav-wrapper">
            <Link to="/" className="logo">
              Enthuse
            </Link>
            <ul
              id="nav-mobile"
              className="right hide-on-med-and-down black-text "
            >
              <li>
                <PostCreate />
              </li>
              <li>
                <Link
                  to={`/profile/${this.props.auth.user.username}`}
                  style={{ marginRight: "5px", color: "white" }}
                  className="nav-items"
                >
                  {this.props.auth.user.username}
                </Link>
              </li>
              <li onClick={this.stopNav}>
                <Settings />
              </li>
              <li>
                <a className="nav-items" href="/#" onClick={this.onLogoutClick}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        <nav className="z-depth-0">
          <div className="nav-wrapper">
            <Link to="/landing" className="logo">
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
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
