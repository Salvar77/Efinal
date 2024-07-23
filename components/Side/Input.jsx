import classes from "./Input.module.scss";

const Input = (props) => {
  return <input className={classes.styledInput} {...props} />;
};

export default Input;
