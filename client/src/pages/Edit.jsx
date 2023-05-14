import React, { useContext, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { api } from "../api/api";
import { AuthContext } from "../context/authContext";
import { useEffect } from "react";
const Edit = () => {
  let { isLoggedIn } = useContext(AuthContext);
  const [post, setPost] = useState({});
  const [error, setError] = useState("");
  const params = useParams();
  const id = params.id;
  const [image, setImage] = useState(null);
  const [imgPath, setImgPath] = useState("");
  const quillRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    api
      .get(`/post/${id}`)
      .then((response) => {
        setPost(response.data.data[0]);
        console.log(response.data.data[0].img);
        setImage(response.data.data[0].img);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    console.log(event.target.files[0].name);
    let sample = URL.createObjectURL(event.target.files[0]);
    console.log(sample);
    setImgPath(sample);
  };

  const onChangeHandle = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    formData.append("img", image);

    const quill = quillRef.current.getEditor();
    const desc = quill.getText();
    const date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    formData.append("desc", desc);
    formData.append("date", date);
    console.log(formData);
    setError("");

    api
      .put(`/post/${id}`, formData)
      .then((response) => {
        console.log(response.data.data);
        window.alert("file updated successfully");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data);
      });
  };

  return (
    <form className="add" onSubmit={handleClick}>
      <div className="content">
        <input
          name="title"
          type="text"
          value={post.title}
          placeholder="Title"
          onChange={onChangeHandle}
        />

        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            name="desc"
            value={post.desc}
            ref={quillRef}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <div>
            <span>
              <img style={{ width: "80px" }} src={post.img} alt="" srcset="" />
            </span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name="img"
              onChange={handleImageChange}
              //   defaultValue={post.img}
              // onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button type="submit">Update</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={post.cat === "Art"}
              name="cat"
              value="art"
              id="art"
              onChange={onChangeHandle}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={post.cat === "Science"}
              name="cat"
              value="science"
              id="science"
              onChange={onChangeHandle}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={post.cat === "Technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={onChangeHandle}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={post.cat === "Cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={onChangeHandle}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={post.cat === "Design"}
              name="cat"
              value="design"
              id="design"
              onChange={onChangeHandle}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={post.cat === "Food"}
              name="cat"
              value="food"
              id="food"
              onChange={onChangeHandle}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Edit;
