import { useEffect } from "react";
import supabase from "../utils/supabase";

export default function Home() {
  useEffect(() => {
    console.log(supabase.auth.session());
  }, []);
  const signInWithSlack = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "slack",
    });
    console.log(user, session, error);
  };
  return (
    <div>
      <button
        onClick={async (e) => {
          e.preventDefault();
          await signInWithSlack();
        }}
        type="button"
      >
        Sign In With Slack
      </button>
    </div>
  );
}
