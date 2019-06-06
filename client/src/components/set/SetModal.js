import React, { Component } from "react";
import HobbyTree from "../set/HobbyTree";
import { pushCat } from "../../actions/treeAction";
import { Modal, Button } from "react-materialize";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class SetModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      location: {
        country: "US",
        state: "Florida",
        county: "Alachua"
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.state.category);
    console.log(nextProps);
    if (nextProps.tree) {
      if (nextProps.tree.category) {
        this.setState({
          category: nextProps.tree.category
        });
      }
    }
  }

  addSet(category, location) {
    if (this.state) {
      if (this.state.category && this.state.location) {
        const set = {
          category: this.state.category,
          location: this.state.location
        };
        this.props.pushCat(set);
      } else if (this.state.category) {
        console.log("no location");
      } else if (this.state.location) {
        console.log("no category");
      } else {
        console.log("neither location nor category");
      }
      /*
    const set = [this.state.category,
                this.state.location];
                */
    }
  }

  render() {
    return (
      <div>
        <Modal trigger={<Button>Set up your Home Page</Button>}>
          <div className="row">
            <div className="col s6"> Location </div>
            <div className="col s6">
              Categories
              <HobbyTree />
              {this.state.category}
            </div>
          </div>
          <div className="row">
            <Button onClick={this.addSet.bind(this)}>Add</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tree: state.tree,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { pushCat }
)(withRouter(SetModal));

/*
            <div className="row">
                <div className="col s6"></div>
                <div className="col s6"><HobbyTree/></div>
            </div>
*/
