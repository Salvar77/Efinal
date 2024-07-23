import classes from "./Button.module.scss";
import classNames from "classnames";

const Button = ({ className, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(classes.styledButton, className)}
    >
      {children}
    </button>
  );
};

export default Button;
