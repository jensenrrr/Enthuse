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
      homePage: [],
    };
    this.onModalChange = this.onModalChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onModalChange = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit(index) {

    var sendSets = JSON.parse(JSON.stringify(this.props.set.homePage));
  console.log(index);
    sendSets.splice(index, 1);
    console.log(sendSets);
    var data = {
      sets: sendSets,
      id: this.props.auth.user.id
    };
    
    this.props.homepageChange(data);
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
          !this.props.set.homePage.some(
            e =>
              e.category === set.category &&
              (e.location.county === set.location.county &&
                e.location.country === set.location.country &&
                e.location.state === set.location.state &&
                e.location.city === set.location.city)
          )
        ) {
          //console.log("non duplicate");
          var sendSets = JSON.parse(JSON.stringify(this.props.set.homePage));
          sendSets.push(set);
          console.log(set);
          var data = {
            sets: sendSets,
            id: this.props.auth.user.id
          };
          console.log(data);
          this.props.homepageChange(data);
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
  
  render() {
    const { errors } = this.state;

    return (
      <div>
      <div className="card-content">
              <h1>Homepage:</h1>
              <div style={{ clear: "left", textAlign: "left", paddingLeft: "20px" }}>
                {this.props.set.homePage.map((set, index) => (
                  <span
                    key={set.category + set.location.county + set.location.state}
                  >

                    <div className="left-align">
                      <Button className="cyan lighten-1 waves-light"
                      onClick={this.onSubmit}>
                        {set.category} | {set.location.county}
                        <i className="material-icons right">remove</i>
                      </Button>
                    </div>
                    <br />
                  </span>
                ))}
              </div>
              </div>
      <div>
        <div className="row">
          
                        <h1>Location</h1>
                        <Location />
                        <h3>Selected Location: {this.state.location.county!=""}</h3>
                      </div>
                      <div className="row">
                        <h1>Categories</h1>
                        <HobbyTree />
                        <h3>Selected Category: {this.state.category}</h3>
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
              Homepage Set
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
