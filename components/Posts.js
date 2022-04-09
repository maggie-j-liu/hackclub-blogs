import Post from "./Post";
import { useState } from "react";

const Posts = ({ posts }) => {
  const POST_INCREMENT = 20;
  const [numPostsToShow, setNumPostsToShow] = useState(
    Math.min(POST_INCREMENT, posts.length)
  );
  const loadMore = () => {
    setNumPostsToShow((p) => Math.min(p + POST_INCREMENT, posts.length));
  };
  return (
    <div className="mx-auto flex flex-col gap-10">
      {posts.slice(0, numPostsToShow).map((post) => (
        <Post post={post} key={post.link} />
      ))}
      {numPostsToShow < posts.length ? (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            loadMore();
          }}
          className="mx-auto w-max rounded-full border-2 border-muted/75 px-6 py-2 font-medium text-muted duration-150 hover:border-red hover:text-red hover:duration-100"
        >
          Load More Posts
        </button>
      ) : null}
    </div>
  );
};

export default Posts;
