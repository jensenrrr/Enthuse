import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal, Tabs, Tab } from "react-materialize";
import ChangeUsername from "./ChangeUsername";
import ChangeHomepage from "./ChangeHomepage";
class Settings extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      username: "",
    };
    this.onModalChange = this.onModalChange.bind(this);
  }
  onModalChange = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };
  componentDidMount() {
    if (this.props.auth) {
      if (this.props.auth.user) {
        this.setState({
          username: this.props.auth.user.username,
        });
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.isModalOpen) {
      if (nextProps.auth) {
        if (nextProps.auth.user) {
          console.log("testing");
          console.log(
            nextProps.auth.user.username + " vs.  " + this.state.username
          );
          if (nextProps.auth.user.username != this.state.username) {
            console.log("modal down");

            this.onModalChange();
            this.setState({
              username: nextProps.auth.user.username,
            });
          }
        }
      }
    }
  }

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
          <Tabs>
            <Tab
              stlye={{ margin: "auto", display: "block" }}
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false,
              }}
              title="Change Username"
            >
              <ChangeUsername />
            </Tab>
            <Tab
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false,
              }}
              title="Change Homepage"
            >
              <ChangeHomepage/>
            </Tab>
          </Tabs>
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
