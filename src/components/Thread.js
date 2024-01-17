const Thread = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.postsData);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div className="thread-container">
      {Array.isArray(posts) &&
        posts
          .filter((post) => {
            if (
              !post.createdAt ||
              new Date(post.createdAt).toString() === "Invalid Date"
            ) {
              console.error("Invalid date:", post);
              return false;
            }
            return true;
          })
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((post) => <Post key={post._id} post={post} />)}
    </div>
  );
};

export default Thread;
