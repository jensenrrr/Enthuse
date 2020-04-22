import React, { Component } from "react";
import PlacesData from "../../data/places.json";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setLocation } from "../../actions/setActions";
import { withRouter } from "react-router-dom";
import FuzzyPicker from 'react-fuzzy-picker';
import { Tab, Tabs } from "react-materialize";

class Location extends Component {

  constructor(props) {
    super(props);

    this.state = {
      country: "",
      state: "",
      city: "",
      county: "",
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
      city: k,
      county: l

    });

    this.props.setLocation({
      country: i,
      state: j,
      city: k,
      county: l,
      nickname: ""
    });

  }
  render() {
    return (
      <Tabs className="tab-demo z-depth-1 tabs-fixed-width">
        <Tab
          active
          options={{
            duration: 300,
            onShow: null,
            responsiveThreshold: Infinity,
            swipeable: false
          }}
          title="County"
        >
          <FuzzyPicker
            isOpen={true}
            onClose={() => console.log('You closed the fuzzy-picker')}
            onChange={choice => { this.clickHandler(choice.country, choice.state,"" , choice.county) }}
            autoCloseOnEnter={true}
            items={PlacesData}
            displayCount={4}
            itemValue={item => item.county}
            renderItem={item => <span>{item.county}</span>}
          />
        </Tab>
        <Tab

          options={{
            duration: 300,
            onShow: null,
            responsiveThreshold: Infinity,
            swipeable: false
          }}
          title="State"
        >
          <FuzzyPicker

            isOpen={true}
            onClose={() => console.log('You closed the fuzzy-picker')}
            onChange={choice => { this.clickHandler(choice.country, choice.state, "", "") }}
            autoCloseOnEnter={true}
            items={PlacesData}
            displayCount={1}
            itemValue={item => item.state}
            renderItem={item => <span>{item.state}</span>}
          />
        </Tab>
        <Tab
          options={{
            duration: 300,
            onShow: null,
            responsiveThreshold: Infinity,
            swipeable: false
          }}
          title="Country"
        >
          <FuzzyPicker
            isOpen={true}
            onClose={() => console.log('You closed the fuzzy-picker')}
            onChange={choice => { this.clickHandler(choice.country, "", "", "") }}
            autoCloseOnEnter={true}
            items={PlacesData}
            displayCount={1}
            itemValue={item => item.country}
            renderItem={item => <span>{item.country}</span>}
          />
        </Tab>
      </Tabs>
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
