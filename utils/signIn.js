import supabase from "./supabase";
const signIn = async (provider = "slack") => {
  await supabase.auth.signIn(
    {
      provider,
    },
    {
      redirectTo: window.location.href,
    }
  );
};

export default signIn;
