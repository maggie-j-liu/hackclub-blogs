import supabase from "../utils/supabase";
import useAuth from "../utils/useAuth";

export default function Home() {
  const { user, loading } = useAuth();
  // console.log(user, loading);
  const signInWithSlack = async () => {
    await supabase.auth.signIn({
      provider: "slack",
    });
  };
  if (loading) {
    return null;
  }
  return (
    <div>
      {user ? (
        <button
          onClick={async (e) => {
            e.preventDefault();
            await supabase.auth.signOut();
          }}
          type="button"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={async (e) => {
            e.preventDefault();
            await signInWithSlack();
          }}
          type="button"
        >
          Sign In With Slack
        </button>
      )}
    </div>
  );
}
