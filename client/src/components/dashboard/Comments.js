import React, { Component } from "react";
import { Comment, Form, Header } from "semantic-ui-react";
import { Button, Textarea, Icon } from "react-materialize";

import Moment from "react-moment";
import "moment-timezone";

class Comments extends Component {
  constructor() {
    super();
    this.state = {
      zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      colorIn: "favorite_border"
    };
  }
  componentDidMount() {
    this.setState({
      colorIn: this.props.liked ? "favorite" : "favorite_border",
      showReplyBox: false
    });
  }

  openCommentBox() {
    this.setState({
      showReplyBox: !this.state.showReplyBox
    });
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

  onChange = e => {
    // console.log(this.props.com);

    //var fieldName = e.target.name;
    //const fieldValue = event.target.value;
    this.setState({ [e.target.id]: e.target.value });
  };

  like = e => {
    this.props.likeAComment(e);
    this.changeIcon();
  };
  /*
  submit() {
    console.log(this.props.id);
    var data = {
      _userid: this.props.userid,
      _commentid: this.props.id,
      _postid: this.props.postid,
      content: this.state.commentContent,
      index: this.props.index
    };
    this.props.commentOnComment(data);
    this.openCommentBox();
  }*/

  render() {
    return (
      <div className="ui comments">
        <Comment className="comment">
          <Comment.Content>
            <Comment.Author className="author" as="a">
              {this.props.username} {"  "} {this.props.fistName}{" "}
              {this.props.lastName}
            </Comment.Author>
            <Comment.Metadata>
              <Moment format="h:mm A" tz={this.state.zone}>
                {this.props.date}
              </Moment>
              {" on "}
              <Moment format="MMM D, YYYY" tz={this.state.zone}>
                {this.props.date}
              </Moment>
            </Comment.Metadata>
            <Comment.Text className="content">
              {this.props.children}
            </Comment.Text>
            <Comment.Actions>
              <span style={{ marginLeft: "15px", paddingRight: "20%" }}>
                <span
                  onClick={() =>
                    this.like({
                      commentid: this.props.id,
                      userid: this.props.userid,
                      indices: this.props.indices
                    })
                  }
                  onMouseEnter={() => this.changeIcon()}
                  onMouseLeave={() => this.changeIcon()}
                >
                  <Icon> {this.state.colorIn} </Icon>
                </span>{" "}
                {this.props.likes}
              </span>
              <Comment.Action onClick={() => this.openCommentBox()}>
                Reply
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
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
                onClick={() => {
                  this.props.submit({
                    content: this.state.commentContent,
                    _commentid: this.props.id,
                    _postid: this.props.postid,
                    _userid: this.props.userid,
                    index: this.props.index,
                    indices: this.props.indices
                  });
                  this.openCommentBox();
                }}
              >
                Submit
              </Button>
            </div>
          ) : null}
          <Comment.Group>
            {this.props.com.comments &&
              this.props.com.comments.map((comment, i) => (
                <Comments
                  com={comment}
                  key={comment.commentID}
                  id={comment.commentID}
                  postid={this.props.postid}
                  date={comment.date}
                  username={comment.username}
                  firstname={comment.firstname}
                  lastname={comment.lastname}
                  likes={comment.likes}
                  liked={comment.liked}
                  index={i}
                  userid={this.props.userid}
                  commentCount={comment.commentCount}
                  submit={this.props.submit.bind(this)}
                  indices={[...this.props.indices, i]}
                  likeAComment={this.props.likeAComment.bind(this)}
                >
                  {comment.content}
                  <br />
                </Comments>
              ))}
          </Comment.Group>
        </Comment>
      </div>
    );
  }
}

export default Comments;
