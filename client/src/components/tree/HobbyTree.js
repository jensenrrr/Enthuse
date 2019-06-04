import React, { Component } from "react";
import TreeMenu from "react-simple-tree-menu";

const treeData = [
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
/*
const treeData = [
  {
    key: "first-level-node-1",
    label: "Video Games",
    nodes: [
      {
        key: "second-level-node-1",
        label: "Fighting",
        nodes: [
          {
            key: "third-level-node-1",
            label: "Super Smash Bros.",
            nodes: [
              {
                key: "fourth-level-node-1",
                label: "SSB Melee"
              },
              {
                key: "fourth-level-node-2",
                label: "SSB Ultimate"
              },
              {
                key: "fourth-level-node-3",
                label: "SSB Four"
              },
              {
                key: "fourth-level-node-4",
                label: "SSB Brawl"
              }
            ]
          },
          {
            key: "third-level-node-2",
            label: "Mortal Combat",
            nodes: []
          }
        ]
      },
      {
        key: "second-level-node-2",
        label: "MOBAs",
        nodes: [
          {
            key: "third-level-node-1",
            label: "League of Legends"
          },
          {
            key: "third-level-node-2",
            label: "DOTA"
          },
          {
            key: "third-level-node-3",
            label: "Smite"
          },
          {
            key: "third-level-node-4",
            label: "Heroes of the Storm"
          }
        ]
      }
    ]
  },
  {
    key: "first-level-node-2",
    label: "Sports",
    nodes: [
      {
        key: "second-level-node-1",
        label: "Combat Sports",
        nodes: [
          {
            key: "third-level-node-1",
            label: "Wrestling"
          },
          {
            key: "third-level-node-2",
            label: "Kickboxing"
          },
          {
            key: "third-level-node-3",
            label: "Fencing"
          },
          {
            key: "third-level-node-4",
            label: "Jiu-jitsu"
          }
        ]
      },
      {
        key: "second-level-node-2",
        label: "Football"
      },
      {
        key: "second-level-node-3",
        label: "Basketball"
      }
    ]
  }
];
*/
class HobbyTree extends Component {
  constructor(props) {
    
    super(props);

    this.state = {
      category: "",
      treeData: "meme"
  };
  }
  componentDidMount() {
    
    fetch('http://localhost:5000/api/tree/tree')
    .then(results => results.json())
    .then(treeData => this.setState({ treeData }));
    
  }

  render() {
    return (
      <TreeMenu
      data={treeData}
      onClickItem={({ key, label }) => {
        this.setState({
          category: label
        });
      }}
    />
    );
  }
}

export default HobbyTree;
