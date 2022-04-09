import supabase from "./supabase";
const signIn = async () => {
  await supabase.auth.signIn(
    {
      provider: "slack",
    },
    {
      redirectTo: window.location.href,
    }
  );
};

export default signIn;
