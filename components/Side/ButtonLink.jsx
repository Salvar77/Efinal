import Link from "next/link";
import classes from "./ButtonLink.module.scss";

const ButtonLink = (props) => {
  return <Link className={classes.buttonStyle} {...props} />;
};

export default ButtonLink;
