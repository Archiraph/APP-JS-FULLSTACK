import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../feature/post.slice";

const DeletePost = ({ postId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    axios.delete("https://full-stack-app-zeta.vercel.app/post/" + postId);
    dispatch(deletePost(postId));
  };

  return (
    <span id="delete-btn" onClick={() => handleDelete()}>
      &#10010;
    </span>
  );
};

export default DeletePost;
