const Header = ({ title, isSubTitle = false }) => {
  if (isSubTitle) return <h2>{title}</h2>;
  return <h1>{title}</h1>;
};

export default Header;
