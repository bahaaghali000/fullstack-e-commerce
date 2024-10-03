const Helmet = ({ title, children }) => {
  document.title = "Multimart - " + title;
  return <div className="w-100">{children}</div>;
};

export default Helmet;
