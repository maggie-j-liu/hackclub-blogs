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
      <Layout>
        <div className="text-lg">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
            className="rounded-md bg-gradient-to-r from-red to-orange px-4 py-1 font-semibold text-white duration-100 hover:scale-105"
          >
            Sign In
          </button>{" "}
          to add a blog
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="mx-auto w-max bg-gradient-to-r from-red to-orange bg-clip-text pb-1 text-center text-5xl font-bold text-transparent">
        Add a Blog
      </h1>
      <div className="mx-auto w-max">
        <label className="mt-6 block">
          <span className="block text-xl">RSS Feed Link</span>
          <input
            type="url"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
            className="w-96 rounded border-2 border-red px-2 py-1 text-lg focus:border-orange focus:outline-none"
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
