import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { upVotePost, comment } from "../../actions/postActions";
import { Button, Icon } from "react-materialize";
import Moment from "react-moment";
import "moment-timezone";

class Post extends Component {
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

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps.post.posts[this.props.index].liked);
    //console.log(this.props.post.posts[this.props.index].liked);
    if (
      nextProps.post.posts[this.props.index].liked !=
      this.props.post.posts[this.props.index].liked
    ) {
      this.changeIcon();
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
        <div className="left-align">
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
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  upVotePost: PropTypes.func.isRequired,
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
  { upVotePost, comment }
)(Post);
