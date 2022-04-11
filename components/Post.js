import { formatInTimeZone } from "date-fns-tz";
import Icon from "supercons";

const Post = ({ post }) => {
  const formattedDate = post.date
    ? formatInTimeZone(new Date(post.date), "GMT", "PP")
    : null;
  return (
    <div className="flex gap-4">
      <div className="hidden w-36 flex-shrink-0 text-muted md:block">
        <div>{formattedDate}</div>
        <div className="text-sm font-light">{post.author}</div>
      </div>
      <div className="flex-shrink">
        <div className="flex flex-wrap items-center gap-x-4">
          <a
            className="block w-max hover:text-red hover:underline hover:decoration-wavy"
            href={post.link}
            target="_blank"
            rel="noreferrer"
          >
            <h2 className="w-max text-xl font-bold">{post.title}</h2>
          </a>
          {post.blogTitle ? (
            <a
              href={post.blogLink}
              className="text-lg font-light leading-snug text-muted hover:text-slate"
            >
              {"//"} {post.blogTitle}
            </a>
          ) : null}
        </div>
        <div className="text-muted md:hidden">
          {formattedDate}
          {post.date && post.author ? " • " : null}
          {post.author ?? null}
        </div>
        <p className="mt-2 text-slate line-clamp-3">{post.description}</p>
        <a
          href={post.link}
          className="mt-3 flex w-max items-center gap-0.5 rounded-full bg-smoke px-4 py-1.5 text-sm font-semibold text-secondary opacity-75 duration-100 hover:opacity-100"
          target="_blank"
          rel="noreferrer"
        >
          Read More <Icon size={24} glyph="enter" />
        </a>
      </div>
    </div>
  );
};

export default Post;
