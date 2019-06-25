import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost, getPosts } from "../../actions/postActions";
import {
  changeCurrentSet,
  getSetsAndPosts,
  goHome
} from "../../actions/setActions";
import classnames from "classnames";
import { Button, Icon } from "react-materialize";

import Post from "./Post";
import PostCreate from "./PostCreate";
import HobbyTree from "../set/HobbyTree";
import Location from "../set/Location";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
      category: "",
      location: {
        country: "US",
        state: "Florida",
        county: "Alachua"
      },
      list: [],
      ready: false,
      currentSets: [],
      posts: []
    };
  }

  componentDidMount() {
    //console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    /*
    this.setState({
      currentSets: this.props.set.currentSets
    });*/
    //console.log(this.props.auth.user.sets);
    //this.props.getPosts(this.props.set.currentSets);
    this.props.getSetsAndPosts({ id: this.props.auth.user.id });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      if (nextProps.post.posts) {
        this.setState({
          posts: nextProps.post.posts
        });
        //console.log(nextProps.post.posts);
      }
    }
    if (nextProps.set) {
      if (nextProps.set.location) {
        if (nextProps.set.location.county !== "") {
          this.setState({
            location: nextProps.set.location
          });
        }
      }
      if (nextProps.set.category) {
        this.setState({
          category: nextProps.set.category,
          list: nextProps.set.list
        });
        if (this.state.location) {
          this.setState({
            ready: true
          });
        }
      }

      if (nextProps.set.currentSets !== this.props.set.currentSets) {
        if (nextProps.post.ready) {
          //console.log("normal get called");
          this.props.getPosts(nextProps.set.currentSets);
        }
      }
    }
  }

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
                e.location.state === set.location.state)
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
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onSubmit = e => {
    e.preventDefault();

    const newPost = {
      content: this.state.content,
      category: this.state.category,
      location: this.state.location,
      _userid: this.props.auth.user.id,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    //console.log(newPost);
    this.props.createPost(newPost, this.props.history);
  };

  goHome() {
    this.props.goHome({ id: this.props.auth.user.id });
  }

  remove(index) {
    //var sendSets = JSON.parse(JSON.stringify(this.props.set.currentSets));

    var sendSets = JSON.parse(JSON.stringify(this.props.set.currentSets));
    console.log(index);
    sendSets.splice(index, 1);
    console.log(sendSets);
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
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <div style={{ height: "75vh" }}>
        <div className="row">
          <div className="col s3 center-align blue lighten-1">
            Communities:
            <br />
            {this.props.set.currentSets.map((set, index) => (
              <span
                key={set.category + set.location.county + set.location.state}
              >
                {set.category} | {set.location.county}
                <Button small onClick={() => this.remove(index)} waves="light">
                  <Icon>remove</Icon>
                </Button>
                <br />
              </span>
            ))}
            <Button onClick={() => this.goHome()}>
              <Icon>home</Icon>{" "}
            </Button>
            <div className="white left-align" style={{ marginTop: "30px" }}>
              <Location />
              <HobbyTree />
            </div>
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

          <div className="landing-copy col s6 center-align">
            <PostCreate />
            <br />

            <div className="col s12">
              {this.props.post.posts.map((post, index) => (
                <Post
                  key={post.postID}
                  index={index}
                  id={post.postID}
                  county={post.location.county}
                  category={post.category}
                  date={post.date}
                  username={post.username}
                  firstname={post.firstname}
                  lastname={post.lastname}
                  likes={post.likes}
                  liked={post.liked}
                  commentCount={post.commentCount}
                >
                  {post.content}
                  <br />
                </Post>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  changeCurrentSet: PropTypes.func.isRequired,
  goHome: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  getSetsAndPosts: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  set: state.set
});

export default connect(
  mapStateToProps,
  { createPost, getPosts, changeCurrentSet, getSetsAndPosts, goHome }
)(Dashboard);
