import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import {
  upVotePost,
  comment,
  /*commentOnComment,*/
  likeComment,
  loadRestComments,
  getSinglePost,
  singleCommentOnComment,
  singleLoadMoreComments,
  getSingleImage,
} from "../../actions/postActions";
import { Button, Icon, MediaBox } from "react-materialize";
import Moment from "react-moment";
import "moment-timezone";

class ViewPost extends Component {
  constructor() {
    super();
    this.state = {
      zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      colorIn: "favorite_border",
      showReplyBox: false,
      post: {
        location: {
          country: "",
          state: "",
          city: "",
          county: "",
          nickname: "",
        },
        comments: [],
        imgLoaded: false,
      },
    };
  }
  componentDidMount() {
    console.log(this.props.location.pathname.substring(6));
    this.props.getSinglePost({
      id: this.props.location.pathname.substring(6),
    });

    console.log(this.props.post);
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps.post.posts[this.props.index].liked);
    //console.log(this.props.post.posts[this.props.index].liked);
    console.log(nextProps.post);
    if (nextProps.post) {
      console.log(nextProps.post);
      if (nextProps.post.singlepost) {
        this.setState({
          post: nextProps.post.singlepost,
        });
        if (!this.state.imgLoaded) {
          this.props.getSingleImage({
            postid: this.props.location.pathname.substring(6),
            index: [],
          });
          this.setState({
            imgLoaded: true,
          });
        }
        //console.log(nextProps.post.posts);
      }
      if (this.props.post.singlepost) {
        if (nextProps.post.singlepost) {
          if (
            nextProps.post.singlepost.liked !== this.props.post.singlepost.liked
          ) {
            this.changeIcon();
          }
        }
      }
      if (nextProps.post.singlepost) {
        //console.log("checking " + this.state.img);

        if (nextProps.post.singlepost.img != undefined) {
          console.log("img change");
          this.setState({
            img: nextProps.post.singlepost.img,
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
  }

  changeIcon() {
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
    console.log("user ID: ");
    console.log(this.props.auth.user.id);
    var data = {
      _commentid: this.props.id,
      _userid: this.props.auth.user.id,
      _postid: this.props.post.singlepost.postID,
      content: this.state.commentContent,
      index: this.props.index,
      indices: this.props.indices,
    };
    this.props.comment(data);
    this.openCommentBox();
  }
  getSinglePost = (e) => {
    this.props.getSinglePost(e);
  };
  /*commentOnComment = e => {
    this.props.commentOnComment(e);
  };*/
  singleCommentOnComment = (e) => {
    this.props.singleCommentOnComment(e);
  };
  likeAComment = (e) => {
    this.props.likeComment(e);
  };

  loadMoreComments = (e) => {
    console.log(e);
    this.props.singleLoadMoreComments(e);
  };
  /*singleLoadMoreComments = e => {
    this.props.singleLoadMoreComments(e);
  };
  */
  render() {
    console.log(this.state);
    return (
      
      <div style={{ backgroundColor: "#ffffff" }}>
        <div>
          <Link to={`/profile/${this.props.username}`}>
            <h1> {this.props.username} </h1>
          </Link>
          <h2>
            {" "}
            {this.state.post.firstname} {this.state.post.lastname}
          </h2>
        </div>
        <div className="card-content black-text" style={{ clear: "left" }}>
          <p style={{ marginLeft: "30px" }}>{this.state.post.content}</p>
        </div>
        {this.props.post.singlepost ? (
          <div className="card-image" align="center">
            {this.props.post.singlepost.hasImage & (this.state.img != "") ? (
              <img width="700px" src={this.state.img} alt="helpful alt text" />
            ) : null}
          </div>
        ) : (
          ""
        )}{" "}
        <h3>
          {this.state.post.category} | {(this.state.post.location.county != "") ? (this.state.post.location.county) : ((this.state.post.location.state != "") ? this.state.post.location.state : this.state.post.location.country)}
        </h3>
        <h4>
          <Moment format="h:mm A" tz={this.state.post.zone}>
            {this.state.post.date}
          </Moment>
          {" on "}
          <Moment format="MMM D, YYYY" tz={this.state.post.zone}>
            {this.state.post.date}
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
          Favorites: {this.state.post.likes} Comments:{" "}
          {this.state.post.commentCount}
        </p>
        <div className="card-action center-align">
          <button
            className="btn-flat waves-effect waves-light "
            onClick={() => this.likePress()}
            onMouseEnter={() => this.changeIcon()}
            onMouseLeave={() => this.changeIcon()}
          >
            <i className="material-icons left">{this.state.post.colorIn}</i>
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
        <div>
          <div style={{ marginLeft: "30px" }}>
            {this.state.post.comments.map((comment, i) => (
              <Comments
                com={this.state.post.comments[i]}
                userid={this.props.auth.user.id}
                key={comment.commentID}
                id={comment.commentID}
                postid={this.props.post.singlepost.postID}
                date={comment.date}
                username={comment.username}
                firstname={comment.firstname}
                lastname={comment.lastname}
                likes={comment.likes}
                liked={comment.liked}
                submit={this.singleCommentOnComment.bind(this)}
                likeAComment={this.likeAComment.bind(this)}
                loadMoreComments={this.loadMoreComments.bind(this)}
                indices={[this.state.index, i]}
                commentCount={comment.commentCount}
              >
                {comment.content}
              </Comments>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

ViewPost.propTypes = {
  upVotePost: PropTypes.func.isRequired,
  comment: PropTypes.func.isRequired,
  /*commentOnComment: PropTypes.func.isRequired,*/
  likeComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getSinglePost: PropTypes.func.isRequired,
  singleCommentOnComment: PropTypes.func.isRequired,
  singleLoadMoreComments: PropTypes.func.isRequired,
  getSingleImage: PropTypes.func.isRequired,
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
    /*commentOnComment,*/
    likeComment,
    loadRestComments,
    getSinglePost,
    singleCommentOnComment,
    singleLoadMoreComments,
    getSingleImage,
  }
)(ViewPost);
