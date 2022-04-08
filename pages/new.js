import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import useAuth from "../utils/useAuth";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
const New = () => {
  const { loading, user } = useAuth();
  const [link, setLink] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (!loading && user === null) {
      router.replace("/");
    }
  }, [loading, user, router]);
  const submit = async () => {
    if (!link) return;
    console.log(link);
    await supabase.from("blogs").insert(
      {
        link,
      },
      { returning: "minimal" }
    );
    setLink("");
  };
  if (!user) {
    return null;
  }
  return (
    <Layout>
      <h1 className="text-5xl font-bold text-red">Add a Blog</h1>
      <label className="mt-6 block">
        <span className="block text-xl">RSS Feed Link</span>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-80 rounded border-2 border-red px-2 py-1 text-lg focus:border-orange focus:outline-none"
          placeholder="https://example.com/rss.xml"
        />
      </label>
      <button
        className="mt-3 rounded-lg bg-gradient-to-r from-red to-orange px-6 py-1.5 text-xl font-semibold text-white duration-100 hover:scale-105 focus:scale-105 disabled:saturate-0"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          submit();
        }}
        disabled={!link}
      >
        Submit
      </button>
    </Layout>
  );
};

export default New;
