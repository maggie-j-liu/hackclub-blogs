const Post = ({ post }) => {
  return (
    <a href={post.link}>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <p>{post.date.split("T")[0]}</p>
    </a>
  );
};

export default Post;
