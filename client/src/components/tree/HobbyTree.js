import React, { Component } from "react";
import TreeMenu from "react-simple-tree-menu";

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
class HobbyTree extends Component {
  constructor() {
    super();
    this.state = {
      category: ""
    };
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
