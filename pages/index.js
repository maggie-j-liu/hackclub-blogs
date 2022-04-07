import supabase from "../utils/supabase";
import useAuth from "../utils/useAuth";
import Parser from "rss-parser";
import Posts from "../components/Posts";

export default function Home({ posts }) {
  const { user, loading } = useAuth();
  // console.log(user, loading);
  const signInWithSlack = async () => {
    await supabase.auth.signIn({
      provider: "slack",
    });
  };
  if (loading) {
    return null;
  }
  return (
    <div>
      {user ? (
        <button
          onClick={async (e) => {
            e.preventDefault();
            await supabase.auth.signOut();
          }}
          type="button"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={async (e) => {
            e.preventDefault();
            await signInWithSlack();
          }}
          type="button"
        >
          Sign In With Slack
        </button>
      )}
      <Posts posts={posts} />
    </div>
  );
}

export const getStaticProps = async () => {
  const { data: blogs } = await supabase.from("blogs").select();
  const parser = new Parser();
  const parsePromises = blogs.map((blog) => parser.parseURL(blog.link));
  const feeds = await Promise.all(parsePromises);
  const posts = [];
  for (const feed of feeds) {
    for (const item of feed.items) {
      posts.push({
        title: item.title,
        description: item.content,
        link: item.link,
        date: item.isoDate,
      });
    }
  }
  posts.sort((a, b) => {
    const aTime = new Date(a.date).getTime();
    const bTime = new Date(b.date).getTime();
    return bTime - aTime;
  });

  return {
    props: {
      posts,
    },
  };
};
