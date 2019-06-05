import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser, callTree } from "../../actions/authActions";
import classnames from "classnames";
import TreeMenu from "react-simple-tree-menu";


class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      treeData: [{
        "key": "Video Games",
        "label": "Video Games",
        "index": 0,
        "nodes": [
            {
                "key": "Fighting Games",
                "label": "Fighting Games",
                "index": 0,
                "nodes": [
                    {
                        "key": "Super Smash Bros.",
                        "label": "Super Smash Bros.",
                        "index": 0,
                        "nodes": [
                            {
                                "key": "SSB Brawl",
                                "label": "SSB Brawl",
                                "index": 0,
                                "nodes": []
                            },
                            {
                                "key": "SSB Ultimate",
                                "label": "SSB Ultimate",
                                "index": 0,
                                "nodes": []
                            },
                            {
                                "key": "SSB Melee",
                                "label": "SSB Melee",
                                "index": 0,
                                "nodes": []
                            },
                            {
                                "key": "SSB Four",
                                "label": "SSB Four",
                                "index": 0,
                                "nodes": []
                            }
                        ]
                    },
                    {
                        "key": "Street Fighter",
                        "label": "Street Fighter",
                        "index": 0,
                        "nodes": []
                    },
                    {
                        "key": "Injustice",
                        "label": "Injustice",
                        "index": 0,
                        "nodes": []
                    },
                    {
                        "key": "Mortal Kombat",
                        "label": "Mortal Kombat",
                        "index": 0,
                        "nodes": []
                    },
                    {
                        "key": "SoulCalibur",
                        "label": "SoulCalibur",
                        "index": 0,
                        "nodes": []
                    },
                    {
                        "key": "Marvel vs Capcom",
                        "label": "Marvel vs Capcom",
                        "index": 0,
                        "nodes": []
                    },
                    {
                        "key": "Tekken",
                        "label": "Tekken",
                        "index": 0,
                        "nodes": []
                    },
                    {
                        "key": "Dragonball FighterZ",
                        "label": "Dragonball FighterZ",
                        "index": 0,
                        "nodes": []
                    },
                    {
                        "key": "Under Night In Birth",
                        "label": "Under Night In Birth",
                        "index": 0,
                        "nodes": []
                    }
                ]
            },
            {
                "key": "MOBAs",
                "label": "MOBAs",
                "index": 0,
                "nodes": [
                    {
                        "key": "League of Legends",
                        "label": "League of Legends",
                        "index": 0,
                        "nodes": []
                    },
                    {
                        "key": "DOTA",
                        "label": "DOTA",
                        "index": 0,
                        "nodes": []
                    },
                    {
                        "key": "Smite",
                        "label": "Smite",
                        "index": 0,
                        "nodes": []
                    },
                    {
                        "key": "Vainglory",
                        "label": "Vainglory",
                        "index": 0,
                        "nodes": []
                    },
                    {
                        "key": "Heroes of the Storm",
                        "label": "Heroes of the Storm",
                        "index": 0,
                        "nodes": []
                    }
                ]
            },
            {
                "key": "TPS Games",
                "label": "TPS Games",
                "index": 0,
                "nodes": []
            },
            {
                "key": "FPS Games",
                "label": "FPS Games",
                "index": 0,
                "nodes": []
            },
            {
                "key": "Strategy Games",
                "label": "Strategy Games",
                "index": 0,
                "nodes": []
            },
            {
                "key": "Singleplayer Games",
                "label": "Singleplayer Games",
                "index": 0,
                "nodes": []
            },
            {
                "key": "MMORPGs",
                "label": "MMORPGs",
                "index": 0,
                "nodes": []
            }
        ]
    }]
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    this.props.callTree();
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if(nextProps.auth.tree){
      this.setState({
        treeData: nextProps.auth.tree
      })
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.firstName}
                  error={errors.firstName}
                  id="firstName"
                  type="text"
                  className={classnames("", {
                    invalid: errors.firstName
                  })}
                />
                <label htmlFor="name">First Name</label>
                <span className="red-text">{errors.firstName}</span>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.lastName}
                  error={errors.lastName}
                  id="lastName"
                  type="text"
                  className={classnames("", {
                    invalid: errors.lastName
                  })}
                />
                <label htmlFor="name">Last Name</label>
                <span className="red-text">{errors.lastName}</span>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  type="text"
                  className={classnames("", {
                    invalid: errors.username
                  })}
                />
                <label htmlFor="name">Username</label>
                <span className="red-text">{errors.username}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
        <TreeMenu
          data={this.state.treeData}
           onClickItem={({ key, label }) => {
            this.setState({
          category: label
          });
        }}
        />
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  callTree: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  tree: state.treeData
});

export default connect(
  mapStateToProps,
  { registerUser, callTree }
)(withRouter(Register));
