import React, { Component } from "react";
import TreeMenu from "react-simple-tree-menu";
import { callTree, setCat } from "../../actions/setActions";
import { withRouter } from "react-router-dom";
//import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class HobbyTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      list: [],
      errors: {},
      treeData: []
    };
  }

  componentDidMount() {
    this.props.callTree();
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
    if (nextProps.set.tree)
      this.setState({
        treeData: nextProps.set.tree
      });
  }

  render() {
    return (
      <TreeMenu
        data={this.state.treeData}
        onClickItem={({ key, label, list }) => {
          this.setState({
            category: label,
            list: list
          });
          this.props.setCat({ category: label, list: list });
        }}
      />
    );
  }
}

HobbyTree.propTypes = {
  callTree: PropTypes.func.isRequired,
  setCat: PropTypes.func.isRequired,
  set: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  set: state.set,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { callTree, setCat }
)(withRouter(HobbyTree));
