import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { upVotePost, comment } from "../../actions/postActions";
import Moment from "react-moment";
import "moment-timezone";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      zone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }

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
      </div>
    );
  }
}

Post.propTypes = {
  upVotePost: PropTypes.func.isRequired,
  comment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { upVotePost, comment }
)(Post);
