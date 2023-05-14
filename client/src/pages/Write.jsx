import React, { useContext, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { api } from "../api/api";
import { AuthContext } from "../context/authContext";
import { useEffect } from "react";
const Write = () => {
  let { isLoggedIn } = useContext(AuthContext);
  const state = useLocation().state;
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [image, setImage] = useState(null);
  const quillRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
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

    setError("");
    api
      .post("/post", formData)
      .then((response) => {
        console.log(response.data.data);
        window.alert("file created successfully");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      });

    // const imgUrl = await upload();
    // console.log(imgUrl);

    //   try {
    //     state
    //       ? await api.put(`/posts/${state.id}`, {
    //           title,
    //           desc: value,
    //           cat,
    //           img: file ? imgUrl : "",
    //         })
    //       : await api.post(`/posts/`, {
    //           title,
    //           desc: value,
    //           cat,
    //           img: file ? imgUrl : "",
    //           date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    //         });
    //     navigate("/");
    //   } catch (err) {
    //     console.log(err);
    //   }
  };

  return (
    <form className="add" onSubmit={handleClick}>
      <div className="content">
        <input
          name="title"
          type="text"
          placeholder="Title"
          // onChange={(e) => setTitle(e.target.value)}
        />

        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            // value={value}
            // onChange={(e) => setValue(e.target.value)}
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
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name="img"
            onChange={handleImageChange}
            // onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button type="submit">Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              // checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              // onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              // checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              // onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              // checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              // onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              // checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              // onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              // checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              // onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              // checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              // onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Write;
