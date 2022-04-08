import supabase from "./supabase";
const signIn = async () => {
  await supabase.auth.signIn({
    provider: "slack",
  });
};

export default signIn;
