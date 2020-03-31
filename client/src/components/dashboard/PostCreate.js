import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost } from "../../actions/postActions";
import { Modal } from "react-materialize";
import HobbyTree from "../set/HobbyTree";
import Location from "../set/Location";

class PostCreate extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
      category: "",
      location: {
        country: "",
        state: "",
        city:"",
        county: "",
        nickname:""
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.set) {
      if (nextProps.set.category) {
        this.setState({
          category: nextProps.set.category
        });
      }
      if (nextProps.set.location) {
          this.setState({
            location: nextProps.set.location
          });
      }
    }
  }
  onSubmit = e => {
    e.preventDefault();

    const newPost = {
      content: this.state.content,
      category: this.state.category,
      location: this.state.location,
      _userid: this.props.auth.user.id
    };
    console.log(newPost);
    this.props.createPost(newPost, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <Modal trigger={<a className="nav-items" href="/#"
      >
        Post
      </a>}>
        <form noValidate onSubmit={this.onSubmit}>
        <div className="input-field col s12" style={{ paddingBottom: "5px", backgroundColor: "transparent" }}>
                    <textarea onChange={this.onChange}
                      value={this.state.content}
                      id="content" className="materialize-textarea grey lighten-5"></textarea>
                    <label for="commentContent">Thoughts...</label>
                  </div>

          <br />
          <div className="row">
          <div className="left-align">
                      <div className="col s6">
                        <h1>Location</h1>
                        <Location />
                        <h3>Selected Location: {this.state.location.city}</h3>
                      </div>
                      <div className="col s6">
                        <h1>Categories</h1>
                        <HobbyTree />
                        <h3>Selected Category: {this.state.category}</h3>
                      </div>
                    </div>
            
          </div>

          <div
            className="col s12  center-align"
            style={{ paddingLeft: "11.250px" }}
          >
            <button
              type="submit"
              className="btn btn-large waves-effect waves-light hoverable cyan lighten-3"
            >
              Post
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

PostCreate.propTypes = {
  createPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  errors: state.errors,
  set: state.set
});

export default connect(
  mapStateToProps,
  { createPost }
)(PostCreate);
