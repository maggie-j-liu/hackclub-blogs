import Post from "./Post";
import { useState } from "react";
import supabase from "../utils/supabase";

export const POST_INCREMENT = 20;
const Posts = ({ allPosts, rssPosts, postsRetrieved }) => {
  const [blogPostsRetrieved, setBlogPostsRetrieved] = useState(postsRetrieved);
  const [blogPostsShown, setBlogPostsShown] = useState(() => {
    let num = 0;
    for (const post of allPosts) {
      if (!post.fromRSS) {
        num++;
      }
    }
    return num;
  });
  const [numPostsToShow, setNumPostsToShow] = useState(
    Math.min(POST_INCREMENT, allPosts.length)
  );
  const [posts, setPosts] = useState(allPosts);
  const [noMorePosts, setNoMorePosts] = useState(false);
  const loadMore = async () => {
    if (noMorePosts) {
      setNumPostsToShow((n) => Math.min(n + POST_INCREMENT, posts.length));
    }
    const numNeeded = POST_INCREMENT - (blogPostsRetrieved - blogPostsShown);
    console.log("numNeeded", numNeeded);
    const { data: newPosts } = await supabase
      .from("posts")
      .select(
        `
          slug,
          title,
          created_at,
          author (
            username,
            slack_id
          )
        `
      )
      .order("created_at", { ascending: false })
      .range(blogPostsRetrieved, blogPostsRetrieved + numNeeded - 1);
    if (newPosts === null || newPosts.length === 0) {
      setNoMorePosts(true);
      setNumPostsToShow((n) => Math.min(n + POST_INCREMENT, posts.length));
      return;
    }
    const formattedNewPosts = [];
    for (const post of newPosts) {
      const currentPost = {
        title: post.title,
        description: "",
        link: `/post/${post.slug}`,
        date: post.created_at,
        blogTitle: `${post.author.username}'s Blog`,
        author: post.author.username,
        blogLink: `/user/${post.author.slack_id}`,
        fromRSS: false,
      };
      formattedNewPosts.push(currentPost);
    }
    const newAllPosts = [...posts, ...formattedNewPosts];
    newAllPosts.sort((a, b) => {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();
      return bTime - aTime;
    });

    const newNumPosts = blogPostsRetrieved + rssPosts.length + newPosts.length;
    const newNumShown = Math.min(numPostsToShow + POST_INCREMENT, newNumPosts);
    let newNumBlogPostsShown = 0;
    for (let i = 0; i < newAllPosts.length; i++) {
      if (!newAllPosts[i].fromRSS) {
        newNumBlogPostsShown++;
      }
    }
    setBlogPostsShown(newNumBlogPostsShown);
    setPosts(newAllPosts);
    setNumPostsToShow(newNumShown);
    setBlogPostsRetrieved((b) => b + newPosts.length);
  };
  return (
    <div className="mx-auto flex flex-col gap-10">
      {posts.slice(0, numPostsToShow).map((post) => {
        return <Post post={post} key={post.link} />;
      })}
      {noMorePosts && numPostsToShow === posts.length ? null : (
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
      )}
    </div>
  );
};

export default Posts;
