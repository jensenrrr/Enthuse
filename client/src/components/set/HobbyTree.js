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
      errors: {},
      treeData: []
    };
  }

  componentDidMount() {
    this.props.callTree();
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
    if (nextProps.tree.tree)
      this.setState({
        treeData: nextProps.tree.tree
      });
  }

  render() {
    return (
      <TreeMenu
        data={this.state.treeData}
        onClickItem={({ key, label }) => {
          this.setState({
            category: label
          });
          this.props.setCat(label);
        }}
      />
    );
  }
}

HobbyTree.propTypes = {
  callTree: PropTypes.func.isRequired,
  setCat: PropTypes.func.isRequired,
  tree: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tree: state.tree,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { callTree, setCat }
)(withRouter(HobbyTree));
