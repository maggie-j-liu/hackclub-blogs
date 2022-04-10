import Layout from "../../components/Layout";
import { useState } from "react";
import dynamic from "next/dynamic";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

const Post = () => {
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  return (
    <Layout>
      <h1 className="mx-auto w-max bg-gradient-to-r from-red to-orange bg-clip-text pb-2 text-center text-5xl font-extrabold text-transparent">
        Write a Post
      </h1>
      <div data-color-mode="light" className="mx-auto mt-4 max-w-prose text-lg">
        <MDEditor
          value={content}
          onChange={setContent}
          preview={preview ? "preview" : "edit"}
          commandsFilter={(command, isExtra) => {
            console.log(command, isExtra);
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
        />
      </div>
    </Layout>
  );
};

export default Post;
