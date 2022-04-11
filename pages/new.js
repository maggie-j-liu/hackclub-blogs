import { useState } from "react";
import supabase from "../utils/supabase";
import useAuth from "../utils/useAuth";
import Layout from "../components/Layout";
import signIn from "../utils/signIn";
const New = () => {
  const { loading, user } = useAuth();
  const [link, setLink] = useState("");

  const submit = async () => {
    if (!link) return;
    console.log(link);
    await supabase.from("blogs").insert(
      {
        link: link.startsWith("http") ? link : `http://${link}`,
      },
      { returning: "minimal" }
    );
    setLink("");
  };

  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <Layout title="Sign In">
        <div className="m-auto flex h-48 flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-5xl font-semibold">To add a blog,</h1>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
            className="rounded-full bg-gradient-to-r from-red to-orange px-4 py-1 font-semibold text-white duration-100 hover:scale-105"
          >
            Sign in with Slack
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="mx-auto w-max bg-gradient-to-r from-red to-orange bg-clip-text pb-1 text-center text-5xl font-extrabold text-transparent">
        Add a Blog
      </h1>
      <div className="mx-auto w-max">
        <label className="mt-6 block">
          <span className="block text-lg font-semibold tracking-tight text-secondary">
            RSS Feed Link
          </span>
          <input
            type="url"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
            className="mt-1 w-96 border-b-2 border-border text-lg placeholder:text-placeholder focus:border-muted focus:outline-none"
            placeholder="https://example.com/rss.xml"
          />
        </label>
        <button
          className="mt-3 rounded-full bg-gradient-to-r from-red to-orange px-6 py-1.5 text-xl font-semibold text-white duration-100 hover:scale-105 focus:scale-105 disabled:cursor-not-allowed disabled:saturate-0 disabled:hover:scale-100"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            submit();
          }}
          disabled={!link}
        >
          Submit
        </button>
      </div>
    </Layout>
  );
};

export default New;
