import classes from "./BurgerMenu.module.scss";
import Logo from "./Logo";

const BurgerMenu = ({ isOpen, handleOpen }) => {
  const toggleActive = () => {
    handleOpen();
  };

  return (
    <div className={classes.burgerBox}>
      <button
        className={`${classes.hamburger} ${classes.hamburger__stand} ${
          isOpen ? classes.isActive : ""
        }`}
        type="button"
        onClick={toggleActive}
        aria-label={isOpen ? "zamknij menu" : "otwórz menu"}
      >
        <span className={classes.hamburgerBox}>
          <span className={classes.hamburgerInner}></span>
        </span>
      </button>
      <div className={classes.burgerBoxLogo}>
        {" "}
        <Logo></Logo>
      </div>
    </div>
  );
};

export default BurgerMenu;
