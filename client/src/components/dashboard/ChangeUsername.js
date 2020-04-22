import React, { Component } from "react";
import { Button } from "react-materialize";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { usernameChange } from "../../actions/authActions";
import classnames from "classnames";

class ChangeUsername extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      email: "",
      password: "",
      username: "",
      errors: {},
    };
    this.onModalChange = this.onModalChange.bind(this);
  }
  onModalChange = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onSubmit = (e) => {
    e.preventDefault();

    var userData = {
      email: this.state.email,
      password: this.state.password,
      newUsername: this.state.username,
    };
    console.log(userData);
    this.props.usernameChange(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="input-field col s12">
            <input
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
              type="email"
              className={classnames("", {
                invalid: errors.email || errors.emailnotfound,
              })}
            />
            <label htmlFor="email">Email</label>
            <span className="red-text">
              {errors.email}
              {errors.emailnotfound}
            </span>
          </div>
          <div className="input-field col s12">
            <input
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id="password"
              type="password"
              className={classnames("", {
                invalid: errors.password || errors.passwordincorrect,
              })}
            />
            <label htmlFor="password">Password</label>
            <span className="red-text">
              {errors.password}
              {errors.passwordincorrect}
            </span>
          </div>
          <div className="input-field col s12">
            <input
              onChange={this.onChange}
              value={this.state.newUsername}
              error={errors.newUsername}
              id="username"
              type="email"
              className={classnames("", {
                invalid: errors.newUsername,
              })}
            />
            <label htmlFor="name">New Username</label>
            <span className="red-text">{errors.newUsername}</span>
          </div>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              type="submit"
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              onClick={this.onSubmit}
            >
              Change Username
            </button>
          </div>
        </form>
      </div>
    );
  }
}
ChangeUsername.propTypes = {
  usernameChange: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  set: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  errors: state.errors,
  set: state.set,
});

export default connect(
  mapStateToProps,
  { usernameChange }
)(ChangeUsername);
