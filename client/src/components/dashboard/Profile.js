import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserPosts } from "../../actions/postActions";
import Post from "./Post";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    var send = {
      username: this.props.auth.user.username
    };
    this.props.getUserPosts(send);
  }
  /*
  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      if (nextProps.post.posts) {
        this.setState({
          posts: nextProps.post.posts
        });
        //console.log(nextProps.post.posts);
      }
    }
  }*/
  render() {
    return (
      <div className="container col s8 center-align">
        Your Posts:
        {this.props.post.posts.map(post => (
          <Post
            key={post.postID}
            county={post.location.county}
            category={post.category}
            date={post.date}
            username={post.username}
            firstname={post.firstname}
            lastname={post.lastname}
          >
            {post.content}
            <br />
          </Post>
        ))}
      </div>
    );
  }
}

Profile.propTypes = {
  getUserPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getUserPosts }
)(Profile);
