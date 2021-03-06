import supabase from "../utils/supabase";
import useAuth from "../utils/useAuth";
import Parser from "rss-parser";
import Posts, { POST_INCREMENT } from "../components/Posts";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home({ allPosts, rssPosts, postsRetrieved }) {
  return (
    <Layout maxW="max-w-4xl" title="Home">
      <h1 className="mx-auto w-max bg-gradient-to-r from-red to-orange bg-clip-text pb-2 text-center text-6xl font-extrabold text-transparent">
        Hack Club Blogs
      </h1>
      <h2 className="mx-auto text-center text-2xl text-secondary">
        Check out blog posts written by Hack Clubbers!
      </h2>
      {allPosts.length === 0 ? (
        <p className="pt-8 text-center text-xl text-muted">
          No posts yet.{" "}
          <Link href="/new">
            <a className="text-primary underline hover:decoration-wavy focus:decoration-wavy">
              Add your own?
            </a>
          </Link>
        </p>
      ) : (
        <>
          <div className="h-8" />
          <Posts
            allPosts={allPosts}
            rssPosts={rssPosts}
            postsRetrieved={postsRetrieved}
          />
        </>
      )}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data: blogs } = await supabase.from("blogs").select();
  const { data: posts } = await supabase
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
    .limit(POST_INCREMENT);
  const parser = new Parser();
  const parsePromises = blogs.map((blog) => parser.parseURL(blog.link));
  const feeds = await Promise.allSettled(parsePromises);
  const allPosts = [];
  const rssPosts = [];
  for (let i = 0; i < feeds.length; i++) {
    const feed = feeds[i];
    if (feed.status === "rejected") {
      console.log("rejected", blogs[i].link);
      continue;
    }
    for (const item of feed.value.items) {
      const currentPost = {
        title: item.title ?? "",
        description: item.contentSnippet ?? "",
        link: item.link ?? "",
        date: item.isoDate ?? "",
        blogTitle: feed.value.title ?? "",
        author: item.creator ?? "",
        blogLink: feed.value.link ?? "",
        fromRSS: true,
      };
      rssPosts.push(currentPost);
      allPosts.push(currentPost);
    }
  }
  for (const post of posts) {
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
    allPosts.push(currentPost);
  }
  rssPosts.sort((a, b) => {
    const aTime = new Date(a.date).getTime();
    const bTime = new Date(b.date).getTime();
    return bTime - aTime;
  });
  allPosts.sort((a, b) => {
    const aTime = new Date(a.date).getTime();
    const bTime = new Date(b.date).getTime();
    return bTime - aTime;
  });

  return {
    props: {
      allPosts,
      rssPosts,
      postsRetrieved: posts.length,
    },
  };
};
