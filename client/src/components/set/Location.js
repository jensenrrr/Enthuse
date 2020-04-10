import React, { Component }from "react";
import PlacesData from "../../data/places.json";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setLocation } from "../../actions/setActions";
import { withRouter } from "react-router-dom";
import FuzzyPicker from 'react-fuzzy-picker';

class Location extends Component {
  
  constructor(props) {
    super(props);
 
    this.state = {
      country: "",
      state: "",
      county: "",
      city: "",
      nickname: ""
    };
  }
  action(q) {
    console.log(q);
  }
  clickHandler(i, j, k, l) {
    console.log(i);
    console.log(j);
    this.setState({
      country: i,
      state: j,
      city: l,
      county:  k
      
    });

    this.props.setLocation({
      country: i,
      state: j,
      city: l,
      county:  k,
      nickname: ""
    });
    
  }
  render() {
    return (
      <div>
<FuzzyPicker

  isOpen={true}
  onClose={() => console.log('You closed the fuzzy-picker')}
  onChange={choice => { this.clickHandler(choice.country, choice.state, choice.city, choice.county)}}
  autoCloseOnEnter={true}
  items={PlacesData}
  displayCOunt={5}
  itemValue={item => item.city}
  renderItem={item => <span>{item.city}, {item.state}</span>}
/>{/* 
      <FuzzySearch
        placeholder="Search for a location"
        list={PlacesData}
        keys={["city", "state_name"]}
        width={250}
        threshold={0.4}
        //onSelect={this.action('selected')}
        resultsTemplate={(props, state, styles, clickHandler) => {
          return state.results.map((val, i) => {
            const style =
              state.selectedIndex === i
                ? styles.selectedResultStyle
                : styles.resultsStyle;
            return (
              <div key={i} style={style} onClick={() => this.clickHandler(val.country, val.state, val.city, val.county)}>
                {val.city}, {val.state}
              </div>
            );
          });
        }}
      />
      */}
      </div>
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
