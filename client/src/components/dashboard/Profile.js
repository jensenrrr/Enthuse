import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserPosts } from "../../actions/postActions";
import Post from "./Post";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    console.log(this.props.location.pathname.substring(9));
    this.props.getUserPosts({
      username: this.props.location.pathname.substring(9)
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      if (nextProps.post.posts) {
        this.setState({
          posts: nextProps.post.posts
        });
        //console.log(nextProps.post.posts);
      }
    }
  }
  render() {
    return (
      <div className="landing-copy col s6">
      <div style={{padding:"30px"}}>
        <p>Your Posts:</p>
        {this.props.post.posts.map((post, index) => (
          <Post
            key={post.postID}
            index={index}
            id={post.postID}
            county={post.location.county}
            category={post.category}
            date={post.date}
            username={post.username}
            firstname={post.firstname}
            lastname={post.lastname}
            likes={post.likes}
            liked={post.liked}
            commentCount={post.commentCount}
          >
            {post.content}
          </Post>
        ))}
      </div>
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

export default connect(mapStateToProps, { getUserPosts })(Profile);
