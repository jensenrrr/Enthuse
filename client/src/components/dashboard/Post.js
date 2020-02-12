import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Comments from "./Comments";
import {
  upVotePost,
  comment,
  commentOnComment,
  likeComment,
  loadRestComments
} from "../../actions/postActions";
import { Button, Icon, Textarea } from "react-materialize";
import Moment from "react-moment";
import "moment-timezone";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      colorIn: "favorite_border",
      showReplyBox: false
    };
  }
  componentDidMount() {
    this.setState({
      colorIn: this.props.liked ? "favorite" : "favorite_border"
    });
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps.post.posts[this.props.index].liked);
    //console.log(this.props.post.posts[this.props.index].liked);
    if (nextProps.post.posts[this.props.index]) {
      if (
        nextProps.post.posts[this.props.index].liked !==
        this.props.post.posts[this.props.index].liked
      ) {
        this.changeIcon();
      }
    }
    /*
    if (
      this.nextProps.post.posts[this.props.index].liked !=
      this.props.post.posts[this.props.index].liked
    ) {
      this.changeIcon();
    }*/
  }

  changeIcon() {
    //console.log(this.props.index);
    if (this.state.colorIn === "favorite_border") {
      this.setState({
        colorIn: "favorite"
      });
    } else {
      this.setState({
        colorIn: "favorite_border"
      });
    }
  }

  likePress() {
    this.props.upVotePost({
      postid: this.props.id,
      userid: this.props.auth.user.id,
      index: this.props.index
    });
    //this.changeIcon();
    //console.log("liked");
  }

  openCommentBox() {
    this.setState({
      showReplyBox: !this.state.showReplyBox
    });
  }
  onChange = e => {
    //var fieldName = e.target.name;
    //const fieldValue = event.target.value;
    //console.log(this.state.commentContent);
    this.setState({ [e.target.id]: e.target.value });
  };

  submit() {
    console.log(this.state.commentContent);
    var data = {
      _userid: this.props.auth.user.id,
      _postid: this.props.id,
      content: this.state.commentContent,
      index: this.props.index
    };
    this.props.comment(data);
    this.openCommentBox();
  }

  commentOnComment = e => {
    this.props.commentOnComment(e);
  };

  likeAComment = e => {
    this.props.likeComment(e);
  };

  loadMoreComments = e => {
    this.props.loadRestComments(e);
  };

  render() {
    return (
      <div style={{ marginTop: "15px", borderStyle: "solid" }}>
        <div style={{ marginTop: "15px", marginBottom: "15px" }}>
          <span
            className="left-align"
            style={{ fontWeight: "bold", paddingRight: "30%" }}
          >
            {this.props.username}
          </span>
          <span className="right-align">
            {this.props.firstname} {this.props.lastname}
          </span>
        </div>
        {this.props.children}
        <div style={{ marginBottom: "15px", marginTop: "10px" }}>
          <span className="left-align" style={{ paddingRight: "20%" }}>
            {this.props.category} | {this.props.county} County
          </span>
          <span className="right-align">
            <Moment format="h:mm A" tz={this.state.zone}>
              {this.props.date}
            </Moment>
            {" on "}
            <Moment format="MMM D, YYYY" tz={this.state.zone}>
              {this.props.date}
            </Moment>
          </span>
        </div>
        <div className="center-align">
          <span style={{ marginLeft: "15px", paddingRight: "20%" }}>
            <span
              onClick={() => this.likePress()}
              onMouseEnter={() => this.changeIcon()}
              onMouseLeave={() => this.changeIcon()}
            >
              <Icon> {this.state.colorIn} </Icon>
            </span>{" "}
            {this.props.likes}
          </span>
          <span>
            Comments: {this.props.commentCount}
            <Button
              style={{ marginLeft: "15px", marginBottom: "10px" }}
              small
              onClick={() => this.openCommentBox()}
            >
              Reply
            </Button>
            {this.state.showReplyBox ? (
              <div style={{ height: "70px" }}>
                <Textarea
                  label="Comment.."
                  onChange={this.onChange.bind(this)}
                  value={this.state.commentContent}
                  id="commentContent"
                  s={8}
                  m={6}
                  l={4}
                  xl={8}
                />
                <Button
                  style={{ marginLeft: "15px", marginBottom: "10px" }}
                  small
                  onClick={() => this.submit()}
                >
                  Submit
                </Button>
              </div>
            ) : null}
          </span>
        </div>
        {this.props.post.posts[this.props.index].comments != undefined && (
          <div>
            {this.props.post.posts[this.props.index].comments.map(
              (comment, i) => (
                <Comments
                  com={this.props.post.posts[this.props.index].comments[i]}
                  userid={this.props.auth.user.id}
                  key={comment.commentID}
                  id={comment.commentID}
                  postid={this.props.id}
                  date={comment.date}
                  username={comment.username}
                  firstname={comment.firstname}
                  lastname={comment.lastname}
                  likes={comment.likes}
                  liked={comment.liked}
                  submit={this.commentOnComment.bind(this)}
                  likeAComment={this.likeAComment.bind(this)}
                  loadMoreComments={this.loadMoreComments.bind(this)}
                  index={i}
                  indices={[this.props.index, i]}
                  commentCount={comment.commentCount}
                >
                  {comment.content}
                </Comments>
              )
            )}
          </div>
        )}
      </div>
    );
  }
}

Post.propTypes = {
  upVotePost: PropTypes.func.isRequired,
  comment: PropTypes.func.isRequired,
  commentOnComment: PropTypes.func.isRequired,
  likeComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, {
  upVotePost,
  comment,
  commentOnComment,
  likeComment,
  loadRestComments

})(Post);

