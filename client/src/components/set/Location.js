import React, { Component } from "react";
import PlacesData from "../../data/places.json";
import FuzzySearch from "react-fuzzy";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setLocation } from "../../actions/setActions";
import { withRouter } from "react-router-dom";

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "",
      state_name: "",
      county: ""
    };
  }
  action(q) {
    console.log(q);
  }
  clickHandler(i, j, k) {
    console.log(i);
    console.log(j);
    this.setState({
      city: i,
      state_name: j,
      county:  k
    });
    this.props.setLocation({ city: i,
      state_name: j,
      county:  k });
    /*
        
    get the value of state/county/country in a location variable and call
    setLocation(location)
  
    */
  }
  render() {
    return (
      <FuzzySearch
        placeholder="Search for a location"
        list={PlacesData}
        keys={["city", "state_name"]}
        width={250}
        threshold={0.4}
        onSelect={this.action('selected')}
        resultsTemplate={(props, state, styles, clickHandler) => {
          return state.results.map((val, i) => {
            const style =
              state.selectedIndex === i
                ? styles.selectedResultStyle
                : styles.resultsStyle;
            return (
              <div key={i} style={style} onClick={() => this.clickHandler(val.city, val.state_name, val.county)}>
                {val.city}, {val.state_name}
              </div>
            );
          });
        }}
      />
    );
  }
}

Location.propTypes = {
  setLocation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { setLocation }
)(withRouter(Location));
