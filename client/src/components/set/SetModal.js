import React, { Component } from "react";
import HobbyTree from "./HobbyTree";
import Location from "./Location";

import { pushCat } from "../../actions/setActions";
import { Modal, Button } from "react-materialize";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

class SetModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      //location may need adjusting
      location: {
        country: "US",
        state: "Florida",
        county: "Alachua"
      },
      sets: [],
      ready: false
    };
  }

  componentWillReceiveProps(nextProps) {
    //console.log(this.state.category);
    //console.log(nextProps);
    if (nextProps.tree) {
      if (nextProps.tree.category) {
        this.setState({
          category: nextProps.tree.category
        });
        if (this.state.location) {
          this.setState({
            ready: true
          });
        }
      }
    }
  }

  addSet() {
    if (this.state) {
      if (this.state.category && this.state.location) {
        const set = {
          category: this.state.category,
          location: this.state.location
        };
        if (
          !this.state.sets.some(
            e =>
              e.category === set.category &&
              (e.location.county === set.location.county &&
                e.location.country === set.location.country &&
                e.location.state === set.location.state)
          )
        ) {
          //console.log("non duplicate");
          //console.log(this.state.sets);
          this.setState({
            sets: this.state.sets.concat(set)
          });
          this.props.pushCat(set);
        } else {
          console.log("duplicate set");
        }
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
        <Modal trigger={<Button waves="light">Set up your Home Page</Button>}>
          <div className="row">
            <div className="col s6">
              Location
              <Location />{" "}
            </div>
            <div className="col s6">
              Categories
              <HobbyTree />
              {this.state.category}
            </div>
          </div>
          <div className="row">
            <Button
              floating
              waves="light"
              onClick={this.addSet.bind(this)}
              className={classnames("", {
                red: !this.state.ready,
                blue: this.state.ready
              })}
            >
              Add
            </Button>
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
