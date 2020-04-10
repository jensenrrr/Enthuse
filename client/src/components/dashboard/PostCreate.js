import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost } from "../../actions/postActions";
import { Modal, Button } from "react-materialize";
import HobbyTree from "../set/HobbyTree";
import Location from "../set/Location";
import testIMG from "../../data/Lab1.PNG";
import ImageUploader from "react-images-upload";

class PostCreate extends Component {
  constructor() {
    super();
    this.state = {
      pictures: [],
      label: "Upload Images!",
      content: "",
      category: "",
      location: {
        country: "",
        state: "",
        city: "",
        county: "",
        nickname: ""
      }
    };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    if (this.state.pictures.length < 1) {
      this.setState({
        label: "Uploaded Images: "
      });
    }
    this.setState(
      {
        pictures: this.state.pictures.concat(picture)
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
          label: this.state.label.concat(img.name)
        });
      } else {
        this.setState({
          label: this.state.label.concat(", " + img.name)
        });
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.set) {
      if (nextProps.set.category) {
        this.setState({
          category: nextProps.set.category
        });
      }
      if (nextProps.set.location) {
        this.setState({
          location: nextProps.set.location
        });
      }
    }
  }
  onSubmit = e => {
    e.preventDefault();
    var imgArr = this.state.pictures;
    var image = this.state.pictures[0];
    var testing = testIMG;

    console.log("should be -> " + this.state.pictures[0]);
    var newPost = {
      content: this.state.content,
      category: this.state.category,
      location: this.state.location,
      _userid: this.props.auth.user.id,
      hasImage: this.state.pictures.length > 0,
      imgArr: imgArr,
      file: imgArr[0],
      image: image,
      testing: testing
    };
    //console.log("newPost: " + newPost);
    console.log("images: " + newPost.imgArr);
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
    console.log(formData);

    this.props.createPost(formData);
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <Modal trigger={<Button waves="light">Create a Post.</Button>}>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="input-field col s12">
            <input
              onChange={this.onChange}
              value={this.state.content}
              id="content"
              type="text"
            />
            <label htmlFor="Thoughts">Thoughts</label>
          </div>
          <br />
          <div className="row">
            <div className="col s6">
              Location
              <Location /> {this.state.location.county}
            </div>
            <div className="col s6">
              Categories
              <HobbyTree />
              {this.state.category}
            </div>
          </div>
          <div>
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              label={this.state.label}
              onChange={this.onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
          </div>
          <div
            className="col s12  center-align"
            style={{ paddingLeft: "11.250px" }}
          >
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              type="submit"
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Post
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

PostCreate.propTypes = {
  createPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  errors: state.errors,
  set: state.set
});

export default connect(
  mapStateToProps,
  { createPost }
)(PostCreate);
