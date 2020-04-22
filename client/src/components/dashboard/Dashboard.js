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
import { Button, Icon, Collapsible, CollapsibleItem } from "react-materialize";

import Post from "./Post";
import HobbyTree from "../set/HobbyTree";
import Location from "../set/Location";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
      category: "",
      location: {
        country: "",
        state: "",
        city: "",
        county: "",
        nickname: ""
      },
      list: [],
      meme:"",
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
      if (nextProps.set.location) 
      {
        if (nextProps.set.location.county !== "" || nextProps.set.location.state !== "" || nextProps.set.location.country !== "") 
        {
          this.setState({
            location: nextProps.set.location
          });

          if (nextProps.set.location.county !== "") 
          {
            this.setState({
              meme: nextProps.set.location.county
            });
          }
          if (nextProps.set.location.state !== "") 
          {
            this.setState({
              meme: nextProps.set.location.state
            });
          }
          if (nextProps.set.location.country !== "") 
          {
            this.setState({
              meme: nextProps.set.location.country
            });
          }
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
              (e.location.county === set.location.county  &&
                e.location.country === set.location.country  &&
                e.location.state === set.location.state  &&
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
  collapseAll() {

  }

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
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (

      <div className="row">
        <div className="col s3">
          <div className="card grey lighten-5">
            <div className="card-content">
              <h1>Communities:</h1>
              <div style={{ clear: "left", textAlign: "left", paddingLeft: "20px" }}>
                {this.props.set.currentSets.map((set, index) => (
                  <span
                    key={set.location.county+set.location.state+set.location.country}//{set.location.city!="" ? set.location.city+set.location.county+set.location.state+set.location.country : (set.location.county !="") ? (set.location.county+set.location.state+set.location.country) : ((set.location.state !="") ? set.location.state+set.location.country : set.location.country)}
                  >

                    <div className="left-align">
                      <Button className="cyan lighten-1 waves-light" style={{fontSize:18}} onClick={() => this.remove(index)}>
                        {set.category} |  {(set.location.county !="") ? (set.location.county) : ((set.location.state !="") ? set.location.state : set.location.country)}
                        <i className="material-icons right">remove</i>
                      </Button>
                    </div>
                    <br />
                  </span>
                ))}
              </div>

              <div className="center-align" style={{ marginBottom: "10px" }}>
                <Button className="cyan lighten-1 waves-light" onClick={() => this.goHome()}>
                  <Icon>home</Icon>
                </Button>
              </div>
            </div>
            <div className="card-action">
              <Collapsible >
                <CollapsibleItem
                  expanded={false}
                  header="Add Set"
                  node="div"
                >
                  <div className="row">
                    <div className="left-align">
                      <div className="row">
                        <h1>Location</h1>
                        <Location />
                        <h3>Selected Location: {(this.state.location.county !="") ? (this.state.location.county) : ((this.state.location.state !="") ? this.state.location.state : this.state.location.country)}</h3>
                      </div>
                      <div className="row">
                        <h1>Categories</h1>
                        <HobbyTree />
                        <h3>Selected Category: {this.state.category}</h3>
                      </div>
                    </div>
                    <div className="row">
                      <div className="center-align">
                        <Button
                          waves="light"
                          onClick={this.addSet.bind(this)}
                          className={classnames("btn-floating btn-large waves-effect waves-light", {
                            red: !this.state.ready,
                            green: this.state.ready
                          })}
                        >
                          <Icon>add</Icon>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CollapsibleItem>
              </Collapsible>

            </div>
            <div className="card"></div>
          </div>
        </div>
        <div className="landing-copy col s6">
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
              </Post>
            ))}
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
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
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
