import supabase from "../utils/supabase";
import useAuth from "../utils/useAuth";
import Parser from "rss-parser";
import Posts from "../components/Posts";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home({ posts }) {
  const { user, loading } = useAuth();

  return (
    <Layout maxW="max-w-4xl" title="Home">
      <h1 className="pb-2 mx-auto text-6xl font-extrabold text-center text-transparent w-max bg-gradient-to-r from-red to-orange bg-clip-text">
        Hack Club Blogs
      </h1>
      <h2 className="mx-auto text-2xl text-center text-secondary">
        Check out blog posts written by Hack Clubbers!
      </h2>
      {posts.length === 0 ? (
        <p className="pt-8 text-xl text-center text-muted">
          No posts yet.{" "}
          <Link href="/new">
            <a className="underline text-primary hover:decoration-wavy focus:decoration-wavy">
              Add your own?
            </a>
          </Link>
        </p>
      ) : (
        <>
          <div className="h-8" />
          <Posts posts={posts} />
        </>
      )}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data: blogs } = await supabase.from("blogs").select();
  const parser = new Parser();
  const parsePromises = blogs.map((blog) => parser.parseURL(blog.link));
  const feeds = await Promise.allSettled(parsePromises);
  const posts = [];
  for (let i = 0; i < feeds.length; i++) {
    const feed = feeds[i];
    if (feed.status === "rejected") {
      console.log("rejected", blogs[i].link);
      continue;
    }
    for (const item of feed.value.items) {
      posts.push({
        title: item.title ?? "",
        description: item.contentSnippet ?? "",
        link: item.link ?? "",
        date: item.isoDate ?? "",
        blogTitle: feed.value.title ?? "",
        author: item.creator ?? "",
        blogLink: feed.value.link ?? "",
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
