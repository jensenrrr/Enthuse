import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { comment } from "../../actions/postActions";
import { Button, Comment, Form, Header } from "semantic-ui-react";
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
      colorIn: this.props.liked ? "favorite" : "favorite_border"
    });
  }
  render() {
    return (
      <div>
        <Comment>
          <Comment.Content>
            <Comment.Author as="a">
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
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
            <Comment.Text>{this.props.content}</Comment.Text>
          </Comment.Content>
        </Comment>
      </div>
    );
  }
}
Comments.propTypes = {
  comment: PropTypes.func.isRequired,
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
  { comment }
)(Comments);
