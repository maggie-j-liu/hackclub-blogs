import useAuth from "../utils/useAuth";
import signIn from "../utils/signIn";
import Link from "next/link";
import supabase from "../utils/supabase";
import Icon from "supercons";

const Navbar = () => {
  const { user, loading } = useAuth();
  return (
    <nav className="h-16 px-8">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between">
        <div className="flex gap-6">
          <Link href="/">
            <a className="mt-3 flex w-max items-center space-x-1 rounded-full bg-smoke px-3 py-1 text-sm font-semibold text-secondary opacity-75 duration-100 hover:opacity-100">
              Home
            </a>
          </Link>
          <Link href="/new">
            <a className="mt-3 flex w-max items-center space-x-1 rounded-full bg-smoke px-3 py-1 text-sm font-semibold text-secondary opacity-75 duration-100 hover:opacity-100">
              <Icon glyph="plus" />
              Add Blog
            </a>
          </Link>
          <Link href="/post">
            <a className="mt-3 flex w-max items-center space-x-1 rounded-full bg-smoke px-3 py-1 text-sm font-semibold text-secondary opacity-75 duration-100 hover:opacity-100">
              <Icon glyph="post" />
              Write Post
            </a>
          </Link>
        </div>
        <div>
          {loading ? null : user ? (
            <span className="flex items-center">
              <Link href={`/user/${user.user_metadata.sub}`}>
                <a className="mt-3 flex w-max items-center space-x-1 rounded-full bg-smoke px-3 py-1 text-sm font-semibold text-secondary opacity-75 duration-100 hover:opacity-100">
                  <Icon glyph="person" /> <span>{user.user_metadata.name}</span>
                </a>
              </Link>
              &nbsp;&nbsp;
              <button
                type="button"
                className="mt-3 flex w-max items-center space-x-1 rounded-full bg-smoke px-3 py-1 text-sm font-semibold text-secondary opacity-75 duration-100 hover:opacity-100"
                onClick={async (e) => {
                  e.preventDefault();
                  await supabase.auth.signOut();
                }}
              >
                <span>Sign out</span>
                <Icon glyph="door-leave" />
              </button>
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="mt-3 flex w-max items-center space-x-1 rounded-full bg-smoke px-3 py-1 text-sm font-semibold text-secondary opacity-75 duration-100 hover:opacity-100"
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                <span>Sign in with Slack</span> <Icon glyph="slack" />
              </button>
              <button
                type="button"
                className="mt-3 flex w-max items-center space-x-1 rounded-full bg-smoke px-3 py-1 text-sm font-semibold text-secondary opacity-75 duration-100 hover:opacity-100"
                onClick={(e) => {
                  e.preventDefault();
                  signIn("discord");
                }}
              >
                <span>Sign in with Discord</span> <Icon glyph="sam" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
