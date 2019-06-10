import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { upVotePost, comment } from "../../actions/postActions";

class Post extends Component {
  render() {
    return (
      <div className="col s12" style={{ height: "5000%" }}>
        {this.props.children}
        <div>
          <span className="left-align" style={{ paddingRight: "30%" }}>
            {this.props.category}
          </span>
          <span className="right-align">{this.props.county} County</span>
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
