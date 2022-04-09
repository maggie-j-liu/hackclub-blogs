import Image from "next/image";
import supabase from "../../utils/supabase";
import format from "date-fns/format";
import useAuth from "../../utils/useAuth";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const ProfilePage = ({ info }) => {
  const { user } = useAuth();
  const router = useRouter();
  const deleteBlog = async (link) => {
    await supabase.from("blogs").delete().eq("link", link);
    router.replace(router.asPath);
  };
  return (
    <Layout>
      <div className="flex flex-col items-center text-center">
        <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-border">
          <Image
            src={info.avatar}
            layout="fill"
            alt={`${info.username}'s avatar`}
          />
        </div>
        <h1 className="mt-2 bg-gradient-to-r from-red to-orange bg-clip-text text-4xl font-semibold text-transparent">
          {info.username}
        </h1>
        <p className="mt-1 text-xl text-muted">
          Joined on {format(new Date(info.created_at), "PPP")}
        </p>
      </div>
      {info.blogs.length === 0 ? null : (
        <div className="mx-auto mt-6 max-w-2xl">
          <h2 className="text-3xl font-semibold text-slate">Added Blogs</h2>
          <div className="mx-auto mt-2 flex flex-col items-stretch gap-6">
            {info.blogs.map((blog) => (
              <div
                key={blog.link}
                className="flex justify-between gap-2 rounded-md border-2 border-border py-2 px-4 text-lg shadow-md"
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
                    x
                  </button>
                ) : null}
              </div>
            ))}
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
        link
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
  return {
    props: { info },
  };
};

export default ProfilePage;
