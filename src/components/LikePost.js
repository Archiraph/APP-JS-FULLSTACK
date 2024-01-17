import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dislike, like } from "../feature/post.slice";

const LikePost = ({ post }) => {
  const [userLiked, setUserLiked] = useState(false);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post.likers) {
      if (post.likers.includes(userId)) {
        setUserLiked(true);
      } else {
        setUserLiked(false);
      }
    }
  }, [userId]);

  const likePost = () => {
    axios.patch(
      "https://app-js-fullstack-cvqly10dt-archiraphs-projects.vercel.app/post/like-post/" +
        post._id,
      { userId }
    );
    dispatch(like([userId, post._id]));
    setUserLiked(true);
  };

  const dislikePost = () => {
    axios.patch(
      "https://app-js-fullstack-cvqly10dt-archiraphs-projects.vercel.app/post/dislike-post/" +
        post._id,
      {
        userId,
      }
    );
    dispatch(dislike([userId, post._id]));
    setUserLiked(false);
  };

  return (
    <div className="like-icon">
      <p>{post.likers ? post.likers.length : 0}</p>
      {userLiked ? (
        <span id="like-btn" onClick={() => dislikePost()}>
          &#9829;
        </span>
      ) : (
        <span id="dislike-btn" onClick={() => likePost()}>
          &#9829;
        </span>
      )}
    </div>
  );
};

export default LikePost;
