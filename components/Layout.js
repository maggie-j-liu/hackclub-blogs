import Head from "next/head";
import Meta from "@hackclub/meta";

const Layout = ({ children, maxW = "max-w-5xl", title }) => {
  return (
    <main className="px-8 mt-6 mb-20">
      <Meta
        as={Head}
        name="Hack Club Blogs"
        title={title}
        description="View blog posts written by Hack Clubbers."
        image="https://workshop-cards.hackclub.com/Blogs.png?theme=light&md=1&fontSize=250px&caption=Blog%2520posts%2520written%2520by%2520Hack%2520Clubbers"
        color="#ec3750"
      />
      <div className={`mx-auto ${maxW}`}>{children}</div>
    </main>
  );
};

export default Layout;
