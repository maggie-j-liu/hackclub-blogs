import supabase from "../utils/supabase";
import useAuth from "../utils/useAuth";
import Parser from "rss-parser";
import Posts from "../components/Posts";
import signIn from "../utils/signIn";
import Link from "next/link";

export default function Home({ posts }) {
  const { user, loading } = useAuth();

  return (
    <main className="mt-6 px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mx-auto w-max bg-gradient-to-r from-red to-orange bg-clip-text pb-2 text-center text-6xl font-extrabold text-transparent">
          Hack Club Blogs
        </h1>
        <h2 className="mx-auto text-center text-2xl text-secondary">
          Check out blog posts written by Hack Clubbers!
        </h2>
        {posts.length === 0 ? (
          <p className="pt-8 text-center text-xl text-muted">
            No posts yet.{" "}
            <Link href="/new">
              <a className="text-primary underline hover:decoration-wavy focus:decoration-wavy">
                Add your own?
              </a>
            </Link>
          </p>
        ) : (
          <Posts posts={posts} />
        )}
      </div>
    </main>
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
