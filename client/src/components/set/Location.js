import React, { Component } from "react";
import PlacesData from "../../data/places.json";
import FuzzySearch from "react-fuzzy";

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: ""
    };
  }

  meme(q) {
    //console.log(q);
  }
  clickHandler(i) {
    console.log(i);
    console.log("feels");
  }
  render() {
    return (
      <FuzzySearch
        placeholder="Search for a location"
        list={PlacesData}
        keys={["city", "state_name"]}
        width={250}
        onSelect={() => this.meme("selected")}
        threshold={0.4}
        resultsTemplate={(props, state, styles, clickHandler) => {
          return state.results.map((val, i) => {
            const style =
              state.selectedIndex === i
                ? styles.selectedResultStyle
                : styles.resultsStyle;
            return (
              <div key={i} style={style} onClick={() => clickHandler(i)}>
                {val.city}, {val.state_name}
              </div>
            );
          });
        }}
      />
    );
  }
}
export default Location;
