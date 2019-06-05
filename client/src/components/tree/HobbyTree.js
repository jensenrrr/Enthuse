import React, { Component } from "react";
import TreeMenu from "react-simple-tree-menu";
import { callTree } from "../../actions/treeAction";
import { Link, withRouter } from "react-router-dom";
//import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class HobbyTree extends Component {
  constructor(props) {
    
    super(props);

    this.state = {
      category: "",
      errors: {},
      treeData: [
        {
            "key": "Video Games",
            "label": "Video Games",
            "index": 0,
            "nodes": [
                {
                    "key": "Fighting Games",
                    "label": "Fighting Games",
                    "index": 0,
                    "nodes": [
                        {
                            "key": "Super Smash Bros.",
                            "label": "Super Smash Bros.",
                            "index": 0,
                            "nodes": [
                                {
                                    "key": "SSB Brawl",
                                    "label": "SSB Brawl",
                                    "index": 0,
                                    "nodes": []
                                },
                                {
                                    "key": "SSB Ultimate",
                                    "label": "SSB Ultimate",
                                    "index": 0,
                                    "nodes": []
                                },
                                {
                                    "key": "SSB Melee",
                                    "label": "SSB Melee",
                                    "index": 0,
                                    "nodes": []
                                },
                                {
                                    "key": "SSB Four",
                                    "label": "SSB Four",
                                    "index": 0,
                                    "nodes": []
                                }
                            ]
                        },
                        {
                            "key": "Street Fighter",
                            "label": "Street Fighter",
                            "index": 0,
                            "nodes": []
                        },
                        {
                            "key": "Injustice",
                            "label": "Injustice",
                            "index": 0,
                            "nodes": []
                        },
                        {
                            "key": "Mortal Kombat",
                            "label": "Mortal Kombat",
                            "index": 0,
                            "nodes": []
                        },
                        {
                            "key": "SoulCalibur",
                            "label": "SoulCalibur",
                            "index": 0,
                            "nodes": []
                        },
                        {
                            "key": "Marvel vs Capcom",
                            "label": "Marvel vs Capcom",
                            "index": 0,
                            "nodes": []
                        },
                        {
                            "key": "Tekken",
                            "label": "Tekken",
                            "index": 0,
                            "nodes": []
                        },
                        {
                            "key": "Dragonball FighterZ",
                            "label": "Dragonball FighterZ",
                            "index": 0,
                            "nodes": []
                        },
                        {
                            "key": "Under Night In Birth",
                            "label": "Under Night In Birth",
                            "index": 0,
                            "nodes": []
                        }
                    ]
                },
                {
                    "key": "MOBAs",
                    "label": "MOBAs",
                    "index": 0,
                    "nodes": [
                        {
                            "key": "League of Legends",
                            "label": "League of Legends",
                            "index": 0,
                            "nodes": []
                        },
                        {
                            "key": "DOTA",
                            "label": "DOTA",
                            "index": 0,
                            "nodes": []
                        },
                        {
                            "key": "Smite",
                            "label": "Smite",
                            "index": 0,
                            "nodes": []
                        },
                        {
                            "key": "Vainglory",
                            "label": "Vainglory",
                            "index": 0,
                            "nodes": []
                        },
                        {
                            "key": "Heroes of the Storm",
                            "label": "Heroes of the Storm",
                            "index": 0,
                            "nodes": []
                        }
                    ]
                },
                {
                    "key": "TPS Games",
                    "label": "TPS Games",
                    "index": 0,
                    "nodes": []
                },
                {
                    "key": "FPS Games",
                    "label": "FPS Games",
                    "index": 0,
                    "nodes": []
                },
                {
                    "key": "Strategy Games",
                    "label": "Strategy Games",
                    "index": 0,
                    "nodes": []
                },
                {
                    "key": "Singleplayer Games",
                    "label": "Singleplayer Games",
                    "index": 0,
                    "nodes": []
                },
                {
                    "key": "MMORPGs",
                    "label": "MMORPGs",
                    "index": 0,
                    "nodes": []
                }
            ]
        },
        {
            "key": "Sports",
            "label": "Sports",
            "index": 1,
            "nodes": [
                {
                    "key": "Basketball",
                    "label": "Basketball",
                    "index": 1,
                    "nodes": []
                },
                {
                    "key": "Combat Sports",
                    "label": "Combat Sports",
                    "index": 1,
                    "nodes": []
                },
                {
                    "key": "Soccer",
                    "label": "Soccer",
                    "index": 1,
                    "nodes": []
                },
                {
                    "key": "Tennis",
                    "label": "Tennis",
                    "index": 1,
                    "nodes": []
                },
                {
                    "key": "Track",
                    "label": "Track",
                    "index": 1,
                    "nodes": []
                },
                {
                    "key": "Volleyball",
                    "label": "Volleyball",
                    "index": 1,
                    "nodes": []
                },
                {
                    "key": "Football",
                    "label": "Football",
                    "index": 1,
                    "nodes": []
                },
                {
                    "key": "Hockey",
                    "label": "Hockey",
                    "index": 1,
                    "nodes": []
                },
                {
                    "key": "Golf",
                    "label": "Golf",
                    "index": 1,
                    "nodes": []
                },
                {
                    "key": "Rugby",
                    "label": "Rugby",
                    "index": 1,
                    "nodes": []
                }
            ]
        }
      ]
  };
  }
  
  componentDidMount() {
   this.props.callTree();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
      this.setState({
        treeData: nextProps
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
      }}
    />
    );
  }
}

HobbyTree.propTypes = {
  treeCall: PropTypes.func.isRequired,
  tree: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return { items: state.items };
};
export default connect(
  mapStateToProps,
  { callTree }
)(withRouter(HobbyTree));
