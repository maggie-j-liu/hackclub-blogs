import Image from "next/image";
import supabase from "../utils/supabase";
import format from "date-fns/format";
const ProfilePage = ({ info }) => {
  return (
    <div className="py-16">
      <div className="flex flex-col items-center text-center">
        <div className="relative h-48 w-48 overflow-hidden rounded-full">
          <Image
            src={info.avatar}
            layout="fill"
            alt={`${info.username}'s avatar`}
          />
        </div>
        <h1 className="mt-2 text-4xl font-semibold text-gray-600">
          {info.username}
        </h1>
        <p className="mt-1 text-xl text-gray-500">
          Joined on {format(new Date(info.created_at), "PPP")}
        </p>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const slackId = params.slackId;
  const { data: info } = await supabase
    .from("profiles")
    .select()
    .eq("slack_id", slackId)
    .single();
  if (info === null) {
    return {
      notFound: true,
    };
  }
  return {
    props: { info },
  };
};

export default ProfilePage;
