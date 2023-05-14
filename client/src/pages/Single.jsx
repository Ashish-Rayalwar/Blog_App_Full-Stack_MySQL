import React, { useEffect, useState } from "react";
import Edit from "../images/edit.png";
import Delete from "../images/delete.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Menu from "../Components/Menu";

import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

import { api } from "../api/api";

const Single = () => {
  let { currentUser } = useContext(AuthContext);

  let username;
  if (currentUser) {
    username = JSON.parse(currentUser)[0].username;
    // console.log(username);
  }
  const [post, setPost] = useState({});
  const [date, setDate] = useState("");
  const [cuurentdate, setcurrentDate] = useState("");
  const params = useParams();
  const id = params.id;
  console.log(id);
  console.log(params);
  // const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/post/${id}`)
      .then((response) => {
        setDate(response.data.data[0].date.slice(0, 10));
        setPost(response.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/post/${id}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single">
      <div className="content">
        {
          // <img src={`../upload/${post?.img}`} alt="" />
        }
        <img src={post.img} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted on {date}</p>
            {
              // <p>Posted on {moment(post.date).fromNow()}</p>
            }
          </div>
          {username === post.username && (
            <div className="edit">
              <Link to={`/edit/${id}`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p> {post.desc} </p>{" "}
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
