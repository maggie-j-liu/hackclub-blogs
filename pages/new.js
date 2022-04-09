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
        <div className="flex flex-col items-center justify-center h-48 m-auto space-y-4 text-center">
          <h1 className="text-5xl font-semibold">To add a blog,</h1>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
            className="px-4 py-1 font-semibold text-white duration-100 rounded-full bg-gradient-to-r from-red to-orange hover:scale-105"
          >
            Sign in with Slack
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="pb-1 mx-auto text-5xl font-bold text-center text-transparent w-max bg-gradient-to-r from-red to-orange bg-clip-text">
        Add a Blog
      </h1>
      <div className="mx-auto w-max">
        <label className="block mt-6">
          <span className="block text-xl">RSS Feed Link</span>
          <input
            type="url"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
            className="px-2 py-1 text-lg border-2 rounded w-96 border-red focus:border-orange focus:outline-none"
            placeholder="https://example.com/rss.xml"
          />
        </label>
        <button
          className="mt-3 rounded-lg bg-gradient-to-r from-red to-orange px-6 py-1.5 text-xl font-semibold text-white duration-100 hover:scale-105 focus:scale-105 disabled:cursor-not-allowed disabled:saturate-0 disabled:hover:scale-100"
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
