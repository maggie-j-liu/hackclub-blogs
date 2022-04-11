import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";
import Layout from "../../components/Layout";
import supabase from "../../utils/supabase";
const EditorMarkdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);

const Post = ({ post }) => {
  return (
    <Layout>
      <h1 className="mx-auto w-max bg-gradient-to-r from-red to-orange bg-clip-text text-center text-5xl font-extrabold text-transparent">
        {post.title}
      </h1>
      <div className="mx-auto max-w-prose" data-color-mode="light">
        <EditorMarkdown
          rehypePlugins={[[rehypeSanitize]]}
          source={post.content}
        />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { data: post } = await supabase
    .from("posts")
    .select(
      `
      title,
      slug,
      content,
      created_at,
      author (
        username
      )
    `
    )
    .eq("slug", params.slug)
    .single();
  if (post === null) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
  };
};

export default Post;
