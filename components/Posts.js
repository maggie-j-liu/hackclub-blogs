import Post from "./Post";

const Posts = ({ posts }) => {
  return (
    <div className="mx-auto flex flex-col gap-10">
      {posts.map((post) => (
        <Post post={post} key={post.link} />
      ))}
    </div>
  );
};

export default Posts;
