import useAuth from "../utils/useAuth";
import signIn from "../utils/signIn";
import Link from "next/link";
import supabase from "../utils/supabase";

const Navbar = () => {
  const { user, loading } = useAuth();
  return (
    <nav className="h-16 px-8">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between">
        <div className="flex gap-8">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/new">
            <a>Add Blog</a>
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
                onClick={async (e) => {
                  e.preventDefault();
                  await supabase.auth.signOut();
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
