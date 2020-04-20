import React, { Component, Image } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import axios from "axios";
import Img from "react-image";

import {
  upVotePost,
  comment,
  commentOnComment,
  likeComment,
  loadRestComments,
  getSinglePost,
  getImage,
} from "../../actions/postActions";
import { Button } from "react-materialize";
import Moment from "react-moment";
import "moment-timezone";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      colorIn: "favorite_border",
      showReplyBox: false,
      img: "",
    };
  }
  componentDidMount() {
    if (this.props.post.posts[this.props.index].hasImage) {
      this.props.getImage({
        postid: this.props.id,
        index: this.props.index,
      });
    }
    this.setState({
      colorIn: this.props.liked ? "favorite" : "favorite_border",
    });
    //console.log(this.props.post.posts[this.props.index].img);
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
    //console.log(nextProps.post.posts[this.props.index].img);
    if (nextProps.post.posts[this.props.index]) {
      //console.log("checking " + this.state.img);

      if (nextProps.post.posts[this.props.index].img != undefined) {
        //console.log("img change");
        this.setState({
          img: nextProps.post.posts[this.props.index].img,
        });
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
    //console.log(this.state.img);
    //console.log(this.props.index);
    if (this.state.colorIn === "favorite_border") {
      this.setState({
        colorIn: "favorite",
      });
    } else {
      this.setState({
        colorIn: "favorite_border",
      });
    }
  }

  likePress() {
    this.props.upVotePost({
      postid: this.props.id,
      userid: this.props.auth.user.id,
      index: this.props.index,
    });
    //this.changeIcon();
    //console.log("liked");
  }

  openCommentBox() {
    this.setState({
      showReplyBox: !this.state.showReplyBox,
    });
  }
  onChange = (e) => {
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
      index: this.props.index,
    };
    this.props.comment(data);
    this.openCommentBox();
  }

  commentOnComment = (e) => {
    this.props.commentOnComment(e);
  };

  likeAComment = (e) => {
    this.props.likeComment(e);
  };

  loadMoreComments = (e) => {
    this.props.loadRestComments(e);
  };
  getSinglePost = (e) => {
    this.props.getSinglePost(e);
  };

  render() {
    return (
      <div className="row">
        <div className="card grey lighten-5 hoverable">
          <div>
            <Link
              to={`/post/${this.props.id}`}
              style={{ marginRight: "5px", color: "black" }}
            >
              {"View Post"}
            </Link>
          </div>
          <div>
            <Link to={`/profile/${this.props.username}`}>
              <h1> {this.props.username} </h1>
            </Link>
            <h2>
              {" "}
              {this.props.firstname} {this.props.lastname}
            </h2>
          </div>
          <div className="card-content black-text" style={{ clear: "left" }}>
            <p>{this.props.children}</p>
          </div>
          {this.props.post.posts[this.props.index].hasImage &
          (this.state.img != "") ? (
            <img
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: "contain",
              }}
              src={this.state.img}
              alt="helpful alt text"
            />
          ) : null}
          <h3>
            {" "}
            {this.props.category} | {this.props.county} County{" "}
          </h3>
          <h4>
            {" "}
            <Moment format="h:mm A" tz={this.state.zone}>
              {this.props.date}
            </Moment>
            {" on "}
            <Moment format="MMM D, YYYY" tz={this.state.zone}>
              {this.props.date}
            </Moment>
          </h4>

          <p
            style={{
              textAlign: "left",
              fontSize: "medium",
              fontFamily: "Roboto",
              clear: "left",
              marginLeft: "20px",
            }}
          >
            {" "}
            Favorites: {this.props.likes} Comments: {this.props.commentCount}
          </p>
          <div className="card-action center-align">
            <button
              className="btn-flat waves-effect waves-light "
              onClick={() => this.likePress()}
              onMouseEnter={() => this.changeIcon()}
              onMouseLeave={() => this.changeIcon()}
            >
              <i className="material-icons left">{this.state.colorIn}</i>
              Favorite
            </button>
            <button
              className="btn-flat waves-effect waves-light"
              onClick={() => this.openCommentBox()}
            >
              Comment
              <i className="material-icons left">comment</i>
            </button>
            {this.state.showReplyBox ? (
              <div className="row">
                <div className="col s9">
                  <div
                    className="input-field col s12"
                    style={{
                      paddingBottom: "5px",
                      backgroundColor: "transparent",
                    }}
                  >
                    <textarea
                      onChange={this.onChange.bind(this)}
                      value={this.state.commentContent}
                      id="commentContent"
                      className="materialize-textarea grey lighten-5"
                    ></textarea>

                    <label for="commentContent">Comment...</label>
                  </div>
                </div>
                <div className="col s3">
                  <Button
                    className="cyan lighten-2 waves-light"
                    onClick={() => this.submit()}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
          {this.props.post.posts[this.props.index].comments != undefined && (
            <div style={{ marginLeft: "30px" }}>
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
          <div className="card"></div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  upVotePost: PropTypes.func.isRequired,
  getImage: PropTypes.func.isRequired,
  comment: PropTypes.func.isRequired,
  commentOnComment: PropTypes.func.isRequired,
  likeComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  errors: state.errors,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {
    upVotePost,
    comment,
    commentOnComment,
    likeComment,
    loadRestComments,
    getSinglePost,
    getImage,
  }
)(Post);
