const Layout = ({ children, maxW = "max-w-5xl" }) => {
  return (
    <main className="mt-6 mb-20 px-8">
      <div className={`mx-auto ${maxW}`}>{children}</div>
    </main>
  );
};

export default Layout;
