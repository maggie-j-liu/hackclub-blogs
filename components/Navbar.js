import useAuth from "../utils/useAuth";
import signIn from "../utils/signIn";
import Link from "next/link";
import supabase from "../utils/supabase";
import Icon from "supercons";

const Navbar = () => {
  const { user, loading } = useAuth();
  return (
    <nav className="h-16 px-8">
      <div className="flex items-center justify-between h-full max-w-5xl mx-auto">
        <div className="flex gap-8">
          <Link href="/">
            <a className="flex items-center px-3 py-1 mt-3 space-x-1 text-sm font-semibold duration-100 rounded-full opacity-75 w-max bg-smoke text-secondary hover:opacity-100">
              Home
            </a>
          </Link>
          <Link href="/new" passHref>
            <a className="flex items-center px-3 py-1 mt-3 space-x-1 text-sm font-semibold duration-100 rounded-full opacity-75 w-max bg-smoke text-secondary hover:opacity-100">
              <Icon glyph="plus" />
              Add Blog
            </a>
          </Link>
        </div>
        <div>
          {loading ? null : user ? (
            <>
              <Link href={`/user/${user.user_metadata.sub}`}>
                <a>{user.user_metadata.name}</a>
              </Link>{" "}
              &bull;{" "}
              <button
                type="button"
                className="flex items-center px-3 py-1 mt-3 space-x-1 text-sm font-semibold duration-100 rounded-full opacity-75 w-max bg-smoke text-secondary hover:opacity-100"
                onClick={async (e) => {
                  e.preventDefault();
                  await supabase.auth.signOut();
                }}
              >
                <span>Sign out</span>
                <Icon glyph="door-leave" />
              </button>
            </>
          ) : (
            <button
              type="button"
              className="flex items-center px-3 py-1 mt-3 space-x-1 text-sm font-semibold duration-100 rounded-full opacity-75 w-max bg-smoke text-secondary hover:opacity-100"
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              <span>Sign in with Slack</span> <Icon glyph="slack" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
