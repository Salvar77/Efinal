import classes from "./Table.module.scss";

const Table = (props) => {
  return <table {...props} className={classes.styledTable}></table>;
};

export default Table;
