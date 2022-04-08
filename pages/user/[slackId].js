import Image from "next/image";
import supabase from "../../utils/supabase";
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
        <h1 className="text-gray-600 mt-2 text-4xl font-semibold">
          {info.username}
        </h1>
        <p className="text-gray-500 mt-1 text-xl">
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
