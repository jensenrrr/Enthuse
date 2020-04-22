import React, { Component } from "react";
import { Modal,Button } from "react-materialize";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { homepageChange } from "../../actions/authActions";
import classnames from "classnames";
import { pushSet, changeCurrentSet, getSetsAndPosts, goHome } from "../../actions/setActions";
import { withRouter } from "react-router-dom";
import Location from "../set/Location";
import HobbyTree from "../set/HobbyTree";

class ChangeHomepage extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      location: {
        country: "",
        state: "",
        city: "",
        county: "",
        nickname: ""
      },
      category: "",
      list:[],
      sets: [],
      currentSets:[],
      errors: {},
      username: ""
    };
    this.onModalChange = this.onModalChange.bind(this);
  }
  onModalChange = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();

    var userData = {
      currentSets: this.state.currentSets,
      id: this.props.auth.user.id
    };
    this.props.homepageChange(userData);
  };
  addSet() {
    if (this.state) {
      if (this.state.category && this.state.location) {
        const set = {
          category: this.state.category,
          location: this.state.location,
          list: this.state.list
        };
        if (
          !this.props.set.currentSets.some(
            e =>
              e.category === set.category &&
              (e.location.county === set.location.county &&
                e.location.country === set.location.country &&
                e.location.state === set.location.state &&
                e.location.city === set.location.city)
          )
        ) {
          //console.log("non duplicate");
          var sendSets = JSON.parse(JSON.stringify(this.props.set.currentSets));
          sendSets.push(set);
          var data = {
            sets: sendSets,
            id: this.props.auth.user.id
          };
          console.log(data);
          this.props.changeCurrentSet(data);
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
  };
  goHome() {
    this.props.goHome({ id: this.props.auth.user.id });
  }
  remove(index) {
    //var sendSets = JSON.parse(JSON.stringify(this.props.set.currentSets));

    var sendSets = JSON.parse(JSON.stringify(this.props.set.currentSets));
    //console.log(index);
    sendSets.splice(index, 1);
    //console.log(sendSets);
    var data = {
      sets: sendSets,
      id: this.props.auth.user.id
    };
    //console.log(data);

    this.props.changeCurrentSet(data);
    /*
    this.props.removeCurrSet(
      this.props.set.currentSets.findIndex(
        i => i.category === set.category && i.location === set.location
      )
    );*/
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
      <div className="card-content">
              <h1>Homepage:</h1>
              <div style={{ clear: "left", textAlign: "left", paddingLeft: "20px" }}>
                {this.props.set.currentSets.map((set, index) => (
                  <span
                    key={set.category + set.location.county + set.location.state}
                  >

                    <div className="left-align">
                      <p className="cyan lighten-1 waves-light">
                        {set.category} | {set.location.county}
                        <i className="material-icons right">remove</i>
                      </p>
                    </div>
                    <br />
                  </span>
                ))}
              </div>
              </div>
      <div>
        <div className="row">
        <div style={{ clear: "left", textAlign: "left", paddingLeft: "20px" }}>
                {this.props.set.currentSets.map((set, index) => (
                  
                    <div className="left-align">
                      <Button
                      onClick={this.remove(index)}
            floating
            waves="light"
            onClick={this.onSubmit}
            >
              Reset
          </Button>
                      </div>
                      
                ))}
          
          </div>
          </div>
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
                blue: this.state.ready,
              })}
            >
              Add
            </Button>
          </div>
          </div>
        
    );
}
}
ChangeHomepage.propTypes = {
  auth: PropTypes.object.isRequired,
  set: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  changeCurrentSet: PropTypes.func.isRequired,
  goHome: PropTypes.func.isRequired,
  getSetsAndPosts: PropTypes.func.isRequired,
  homepageChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  set: state.set,
});

export default connect(
  mapStateToProps,
  { pushSet, changeCurrentSet, getSetsAndPosts, goHome, homepageChange }
)(withRouter(ChangeHomepage));
