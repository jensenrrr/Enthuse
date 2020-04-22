import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost } from "../../actions/postActions";
import { clearSet } from "../../actions/setActions";
import { Modal } from "react-materialize";
import HobbyTree from "../set/HobbyTree";
import Location from "../set/Location";
import testIMG from "../../data/Lab1.PNG";
import ImageUploader from "react-images-upload";

class PostCreate extends Component {
  constructor() {
    super();
    this.state = {
      pictures: [],
      isModalOpen: false,
      label: "Upload an Image!",
      content: "",
      category: "",
      location: {
        country: "",
        state: "",
        city: "",
        county: "",
        nickname: "",
      },
      locationKey: "1",
    };
    this.onDrop = this.onDrop.bind(this);
    this.onModalChange = this.onModalChange.bind(this);
    this.clearState = this.clearState.bind(this);
  }
  onModalChange = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };
  clearState = () => {
    var newKey = String(parseInt(this.state.locationKey) + 1);
    this.setState({
      pictures: [],
      label: "Upload Images!",
      content: "",
      category: "",
      location: {
        country: "",
        state: "",
        city: "",
        county: "",
        nickname: "",
      },
      locationKey: newKey,
    });
  };
  onDrop(picture) {
    if (this.state.pictures.length < 1) {
      this.setState({
        label: "Uploaded Images: ",
      });
    }
    this.setState(
      {
        pictures: this.state.pictures.concat(picture),
      },
      () => {
        this.changeLabel();
      }
    );
  }

  changeLabel() {
    this.state.pictures.map((img, index) => {
      if (index == 0) {
        this.setState({
          label: this.state.label.concat(img.name),
        });
      } else {
        this.setState({
          label: this.state.label.concat(", " + img.name),
        });
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.set) {
      if (nextProps.set.category) {
        this.setState({
          category: nextProps.set.category,
        });
      }
      if (nextProps.set.location) {
        this.setState({
          location: nextProps.set.location,
        });
      }
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    var imgArr = this.state.pictures;
    var image = this.state.pictures[0];
    var testing = testIMG;
    if (this.state.content == undefined || this.state.content == "") {
      alert("Post needs content.");
      return;
    }
    if (this.state.county =="" && this.state.state ==""&& this.state.country =="") {
      alert("Post needs a location.");
      return;
    }
    if (this.state.category == "" || this.state.category == undefined) {
      alert("Post needs a category");
    }

    //console.log("newPost: " + newPost);
    console.log(
      "images length " +
        this.state.pictures.length +
        " images + " +
        this.state.pictures
    );
    var hasImage = false;
    if (this.state.pictures.length > 0) hasImage = true;
    var formData = new FormData();
    formData.append("file", image);
    formData.append("country", this.state.location.country);
    formData.append("state", this.state.location.state);
    formData.append("county", this.state.location.county);
    formData.append("city", this.state.location.city);
    formData.append("nickname", this.state.location.nickname);
    formData.append("hasImage", hasImage);
    formData.append("category", this.state.category);

    formData.append("content", this.state.content);
    console.log("has image " + hasImage);
    console.log(formData);
    this.props.createPost(formData);
    this.onModalChange();
    this.setState({
      location: {
        country: "",
        state: "",
        city: "",
        county: "",
        nickname: "",
      },
    });
    this.props.clearSet();
    this.clearState();
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <div>
        <a
          className="nav-items"
          onClick={() => {
            this.onModalChange();
          }}
          href="/#"
        >
          Post
        </a>
        <Modal open={this.state.isModalOpen}>
          <form noValidate onSubmit={this.onSubmit}>
            <div
              className="input-field col s12"
              style={{ paddingBottom: "5px", backgroundColor: "transparent" }}
            >
              <textarea
                onChange={this.onChange}
                value={this.state.content}
                id="content"
                className="materialize-textarea grey lighten-5"
              ></textarea>
              <label htmlFor="commentContent">Thoughts...</label>
            </div>

            <br />
            <div className="row">
              <div className="left-align">
                <div className="col s6">
                  <h1>Location</h1>
                  <Location key={this.state.locationKey} />
                  <h3>
                    Selected Location:{" "}
                    {this.state.location.county
                      ? this.state.location.county + " County"
                      : this.state.location.state
                      ? this.state.location.state
                      : this.state.location.country
                      ? this.state.location.country
                      : ""}
                  </h3>

                </div>
                <div className="col s6">
                  <h1>Categories</h1>
                  <HobbyTree />
                  <h3>Selected Category: {this.state.category}</h3>
                </div>
              </div>
            </div>
            <div>
              <ImageUploader
                withIcon={true}
                buttonText="Choose an Image"
                label={this.state.label}
                onChange={this.onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
                singleImage={true}
              />
            </div>
            <div
              className="col s12  center-align"
              style={{ paddingLeft: "11.250px" }}
            >
              <button
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable cyan lighten-3"
              >
                Post
              </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

PostCreate.propTypes = {
  createPost: PropTypes.func.isRequired,
  clearSet: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  errors: state.errors,
  set: state.set,
});

export default connect(
  mapStateToProps,
  { createPost, clearSet }
)(PostCreate);
