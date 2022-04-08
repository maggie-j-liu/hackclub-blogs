const Layout = ({ children }) => {
  return (
    <main className="mt-6 px-8">
      <div className="mx-auto max-w-5xl">{children}</div>
    </main>
  );
};

export default Layout;
