import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import useAuth from "../utils/useAuth";
import { useRouter } from "next/router";
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
    <div>
      <h1>Add a Blog</h1>
      <label>
        <p>RSS Feed Link</p>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </label>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default New;
