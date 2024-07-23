import classes from "./Center.module.scss";

const Center = ({ children }) => {
  return <div className={classes.styledDiv}>{children}</div>;
};

export default Center;
