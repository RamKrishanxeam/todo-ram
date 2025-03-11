const Navbar = () => {
  return (
    <nav>
      <a href="/">All</a>
      <a href="/?todos=active">Active</a>
      <a href="/?todos=completed">Completed</a>
    </nav>
  );
};

export default Navbar;
