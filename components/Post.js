const Post = ({ post }) => {
  return (
    <div className="flex gap-4">
      <div className="hidden w-36 flex-shrink-0 text-muted md:block">
        {post.date.split("T")[0]}
      </div>
      <div className="flex-shrink">
        <a
          className="block w-max text-text hover:text-red hover:underline hover:decoration-wavy"
          href={post.link}
          target="_blank"
          rel="noreferrer"
        >
          <h2 className="w-max text-xl font-bold">{post.title}</h2>
        </a>
        <div className="text-muted md:hidden">{post.date.split("T")[0]}</div>
        <p className="mt-2 text-slate line-clamp-3">{post.description}</p>
        <a
          href={post.link}
          className="mt-3 block w-max rounded-full bg-smoke px-4 py-1.5 text-sm font-semibold text-secondary opacity-75 duration-100 hover:opacity-100"
          target="_blank"
          rel="noreferrer"
        >
          Read More &rarr;
        </a>
      </div>
    </div>
  );
};

export default Post;
