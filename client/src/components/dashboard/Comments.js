import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { commentOnComment } from "../../actions/postActions";
import { Comment, Form, Header } from "semantic-ui-react";
import { Button, Textarea } from "react-materialize";

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

  onChange = e => {
    //var fieldName = e.target.name;
    //const fieldValue = event.target.value;
    this.setState({ [e.target.id]: e.target.value });
  };

  submit() {
    console.log(this.props.id);
    var data = {
      _userid: this.props.auth.user.id,
      _commentid: this.props.id,
      _postid: this.props.postid,
      content: this.state.commentContent,
      index: this.props.index
    };
    this.props.commentOnComment(data);
    this.openCommentBox();
  }

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
                onClick={() => this.submit()}
              >
                Submit
              </Button>
            </div>
          ) : null}
        </Comment>
      </div>
    );
  }
}
Comments.propTypes = {
  commentOnComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { commentOnComment }
)(Comments);
