import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import supabase from "../../utils/supabase";
import { useRouter } from "next/router";
import rehypeSanitize from "rehype-sanitize";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => {
      return <div style={{ height: "400px" }} />;
    },
  }
);

const Post = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [preview, setPreview] = useState(false);
  const [slugError, setSlugError] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const submit = async () => {
    if (!title) {
      setError("Title is required.");
      return;
    }
    if (!slug) {
      setError("Post URL is required.");
      return;
    }
    if (!content) {
      setError("Cannot submit an empty post.");
      return;
    }
    const { data, error } = await supabase.functions.invoke("storePost", {
      body: JSON.stringify({
        title,
        slug,
        content,
      }),
    });
    if (error) {
      setError(error.description || error.message);
      return;
    }

    if (data.error) {
      if (data.error.code == 23505) {
        setError("Post URL is already taken; please choose a different one.");
        setSlugError("Post URLs must be unique.");
        return;
      }
      setError(data.error.message);
      return;
    }
    setTitle("");
    setSlug("");
    setContent("");
    setError("");
    router.push(`/post/${data.data[0].slug}`);
  };
  useEffect(() => {
    if (slug.match(/^[a-zA-Z0-9_-]*$/)) {
      setSlugError("");
    } else {
      setSlugError(
        "Slug can only contain letters, numbers, hyphens, and underscores."
      );
    }
  }, [slug]);
  useEffect(() => {
    setError("");
  }, [title, slug, content]);
  return (
    <Layout>
      <div className="mx-auto max-w-prose text-lg">
        <h1 className="mx-auto mb-4 w-max bg-gradient-to-r from-red to-orange bg-clip-text pb-2 text-center text-5xl font-extrabold text-transparent">
          Write a Post
        </h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-3xl font-bold placeholder:text-placeholder focus:outline-none"
          placeholder="Title..."
        />
        <label>
          <span className="flex leading-tight">
            Post URL: https://hackclub-blogs.vercel.app/
            <input
              pattern="[a-zA-Z0-9_-]*"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className={`${
                slugError ? "border-red" : "border-border focus:border-muted"
              } flex-1 border-b-2 focus:outline-none`}
            />
          </span>
        </label>
        <div className="text-sm">{!slugError ? <br /> : slugError}</div>
        <div data-color-mode="light" className="mx-auto mt-2 text-lg">
          <MDEditor
            maxHeight={Number.MAX_SAFE_INTEGER}
            height={400}
            value={content}
            onChange={setContent}
            preview={preview ? "preview" : "edit"}
            commandsFilter={(command, isExtra) => {
              return isExtra && command.name !== "preview" ? false : command;
            }}
            extraCommands={[
              {
                name: "preview",
                keyCommand: "preview",
                buttonProps: {
                  "aria-label": "Preview markdown",
                  title: "Preview markdown",
                },
                icon: <span>Toggle Preview</span>,
                execute: () => {
                  setPreview((p) => !p);
                },
              },
            ]}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            submit();
          }}
          className="mt-3 rounded-full bg-gradient-to-r from-red to-orange px-6 py-1.5 text-xl font-semibold text-white duration-100 hover:scale-105 focus:scale-105 disabled:cursor-not-allowed disabled:saturate-0 disabled:hover:scale-100"
          disabled={!!slugError || !title || !content}
        >
          Submit
        </button>
        {error ? <div className="font-medium text-red">{error}</div> : null}
      </div>
    </Layout>
  );
};

export default Post;
