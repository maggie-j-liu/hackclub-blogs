import Image from "next/image";
import supabase from "../../utils/supabase";
import { formatInTimeZone } from "date-fns-tz";
import useAuth from "../../utils/useAuth";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Icon from "supercons";
import Link from "next/link";

const ProfilePage = ({ info }) => {
  const { user } = useAuth();
  const router = useRouter();
  const deleteBlog = async (link) => {
    await supabase.from("blogs").delete().eq("link", link);
    router.replace(router.asPath);
  };
  return (
    <Layout title={info.username}>
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="absolute inset-0 -m-1.5 rounded-full bg-gradient-to-tr from-red via-orange to-yellow" />
          <div className="relative h-48 w-48 overflow-hidden rounded-full">
            <Image
              src={info.avatar ? info.avatar : "/default-avatar.png"}
              layout="fill"
              alt={`${info.username}'s avatar`}
            />
          </div>
        </div>
        <h1 className="mt-2 bg-gradient-to-r from-red to-orange bg-clip-text text-4xl font-semibold text-transparent">
          {info.username}
        </h1>
        <p className="mt-1 text-xl text-muted">
          Joined on {formatInTimeZone(new Date(info.created_at), "GMT", "PPP")}
        </p>
      </div>
      {info.blogs.length === 0 ? (
        <p className="pt-24 text-center text-lg font-semibold text-muted">
          No blogs added yet!
        </p>
      ) : (
        <div className="mx-auto mt-6 max-w-2xl">
          <h2 className="text-3xl font-semibold text-slate">Added Blogs</h2>
          <div className="mx-auto mt-2 flex flex-col items-stretch gap-6">
            {info.blogs.map((blog) => (
              <div
                key={blog.link}
                className="flex items-center justify-between gap-2 rounded-2xl border-2 border-border px-4 py-2 text-lg"
              >
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium hover:text-red focus:text-red focus:outline-none"
                >
                  {blog.link}
                </a>
                {user && user.user_metadata.sub === info.slack_id ? (
                  <button
                    className="hover:text-red focus:text-red focus:outline-none"
                    title="Delete Blog"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteBlog(blog.link);
                    }}
                  >
                    <Icon glyph="view-close" />
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
      {info.posts.length === 0 ? null : (
        <div className="mx-auto mt-8 max-w-2xl">
          <h2 className="text-3xl font-semibold text-slate">Posts</h2>
          <div className="flex flex-col divide-y-2 divide-border">
            {info.posts.map((post) => {
              return (
                <div key={post.slug} className="py-4">
                  <Link href={`/post/${post.slug}`}>
                    <a className="block w-max hover:text-red hover:underline hover:decoration-wavy">
                      <h3 className="w-max text-xl font-bold">{post.title}</h3>
                    </a>
                  </Link>
                  <span className="text-muted">
                    {formatInTimeZone(new Date(post.created_at), "GMT", "PP")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const slackId = params.slackId;
  const { data: info } = await supabase
    .from("profiles")
    .select(
      `
      slack_id,
      username,
      created_at,
      avatar,
      blogs (
        link,
        created_at
      ),
      posts (
        title,
        slug,
        created_at
      )
    `
    )
    .eq("slack_id", slackId)
    .single();
  if (info === null) {
    return {
      notFound: true,
    };
  }

  info.blogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  info.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return {
    props: { info },
  };
};

export default ProfilePage;
