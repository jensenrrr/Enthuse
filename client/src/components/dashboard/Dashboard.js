import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { createPost, getPosts } from "../../actions/postActions";
import Post from "./Post";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
      category: "",
      location: {
        country: "US",
        state: "Florida",
        county: "Alachua"
      },
      currentSets: [],
      posts: []
    };
  }

  componentDidMount() {
    this.setState({
      currentSets: this.props.auth.user.sets
    });
    console.log(this.props.auth.user.sets);
    this.props.getPosts(this.props.auth.user.sets);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      if (nextProps.post.posts) {
        this.setState({
          posts: nextProps.post.posts
        });
        console.log(nextProps.post.posts);
      }
    }
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

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
    const { user } = this.props.auth;

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.username}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>

            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.content}
                  id="content"
                  type="text"
                />
                <label htmlFor="Thoughts">Thoughts</label>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.category}
                  id="category"
                  type="text"
                />
                <label htmlFor="Category">Category</label>
              </div>

              <div
                className="col s12  center-align"
                style={{ paddingLeft: "11.250px" }}
              >
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
                  Post
                </button>
              </div>
            </form>

            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
            <div className="col s12  center-align">
              {this.state.posts.map(post => (
                <Post key={post.postID}>
                  {post.content}
                  <br />
                </Post>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { logoutUser, createPost, getPosts }
)(Dashboard);
