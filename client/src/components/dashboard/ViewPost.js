import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Comments from "./Comments";
import {
  upVotePost,
  comment,
  /*commentOnComment,*/
  likeComment,
  loadRestComments,
  getSinglePost,
  singleCommentOnComment,
  singleLoadMoreComments
} from "../../actions/postActions";
import { Button, Icon, Textarea } from "react-materialize";
import Moment from "react-moment";
import "moment-timezone";


class ViewPost extends Component {
  constructor() {
    super();
    this.state = {
      zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      colorIn: "favorite_border",
      showReplyBox: false,
      post:  {
        
        location: {
          country: "",
          state: "",
          city: "",
          county: "",
          nickname: ""
        },
        comments: []
        
      }
    };
  }
  componentDidMount() {
    console.log(this.props.location.pathname.substring(6));
    this.props.getSinglePost({
      id: this.props.location.pathname.substring(6)
    });
    console.log(this.props.post);
    
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps.post.posts[this.props.index].liked);
    //console.log(this.props.post.posts[this.props.index].liked);

    if (nextProps.post) {
      if (nextProps.post.singlepost) {
        this.setState({
          post: nextProps.post.singlepost
        });
        //console.log(nextProps.post.posts);
      }
    }
    //console.log(this.state.post);

    if (nextProps.post.singlepost[this.props.index]) {
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
    console.log("user ID: ");
    console.log(this.props.auth.user.id);
    var data = {
      _commentid: this.props.id,
      _userid: this.props.auth.user.id,
      _postid: this.props.post.singlepost.postID,
      content: this.state.commentContent,
      index: this.props.index,
      indices: this.props.indices
    };
    this.props.comment(data);
    this.openCommentBox();
  }
  getSinglePost = e => {
    this.props.getSinglePost(e);
  };
  /*commentOnComment = e => {
    this.props.commentOnComment(e);
  };*/
  singleCommentOnComment = e => {
    this.props.singleCommentOnComment(e);
  }
  likeAComment = e => {
    this.props.likeComment(e);
  };

  loadMoreComments = e => {
    console.log(e);
    //this.props.singleLoadMoreComments(e);
  };
  /*singleLoadMoreComments = e => {
    this.props.singleLoadMoreComments(e);
  };
  */
  render() {
    return (
      
      <div
        style={{ marginTop: "15px", marginLeft: "15px", borderStyle: "solid" }}
      >
        <div style={{ marginTop: "15px", marginBottom: "15px" }}>
          <span
            className="left-align"
            style={{ fontWeight: "bold", paddingRight: "30%" }}
          >
            {this.state.post.username}
          </span>
          <span className="right-align">
            {this.state.post.firstname} {this.state.post.lastname}
          </span>
        </div>
        {this.state.post.content}
        <div style={{ marginBottom: "15px", marginTop: "10px" }}>
          <span className="left-align" style={{ paddingRight: "20%" }}>
            {this.state.post.category} | {this.state.post.location.county} County
            {console.log(this.state.post.location.county)}

          </span>
          <span className="right-align">
            <Moment format="h:mm A" tz={this.state.post.zone}>
              {this.state.post.date}
            </Moment>
            {" on "}
            <Moment format="MMM D, YYYY" tz={this.state.post.zone}>
              {this.state.post.date}
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
            {this.state.post.likes}
          </span>
          <span>
            Comments: {this.state.post.commentCount}
            <Button
              style={{ marginLeft: "15px", marginBottom: "10px" }}
              small
              onClick={() => this.openCommentBox()}
            >
              Reply
            </Button>
            {this.state.showReplyBox ? (
              <div style={{ height: "60px" }}>
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
         <div>
         {this.state.post.comments.map(
            (comment, i) => (
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
                {comment.commentID}
              </Comments>
            )
          )}
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
  singleLoadMoreComments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, {
  upVotePost,
  comment,
  /*commentOnComment,*/
  likeComment,
  loadRestComments,
  getSinglePost,
  singleCommentOnComment,
  singleLoadMoreComments
})(ViewPost);
