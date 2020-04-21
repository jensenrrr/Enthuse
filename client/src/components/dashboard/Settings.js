import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-materialize";
import ChangeUsername from "./ChangeUsername";
class Settings extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
    };
    this.onModalChange = this.onModalChange.bind(this);
  }
  onModalChange = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  componentWillReceiveProps(nextProps) {}

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <div>
        <a
          className="nav-items"
          onClick={() => {
            this.onModalChange();
          }}
          href="/#"
        >
          Settings
        </a>
        <Modal open={this.state.isModalOpen}>
          <ChangeUsername />
        </Modal>
      </div>
    );
  }
}

Settings.propTypes = {
  auth: PropTypes.object.isRequired,
  set: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  errors: state.errors,
  set: state.set,
});

export default connect(
  mapStateToProps,
  {}
)(Settings);
