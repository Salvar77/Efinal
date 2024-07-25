import Link from "next/link";
import classes from "./Nav.module.scss";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Main/CartContext";

const Nav = ({ isOpen, toggleNav }) => {
  let navClasses = classes.nav;

  const { cartProducts } = useContext(CartContext);
  const [windowWidth, setWindowWidth] = useState(undefined);

  const handleToggleNav = () => {
    if (windowWidth < 992) {
      toggleNav();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("Koszyk zaktualizowany:", cartProducts);
  }, [cartProducts]);

  if (isOpen) {
    navClasses = `${classes.nav} ${classes.nav__show}`;
  }

  return (
    <section id="nav">
      <nav className={navClasses}>
        <div className={classes.nav__container}>
          <Link href={"/"} className={classes.nav__logo}>
            Efinal
          </Link>
          <ul aria-hidden className={classes.nav__items}>
            <li onClick={handleToggleNav}>
              <Link href={"/"}>Home</Link>
            </li>
            <li onClick={handleToggleNav}>
              <Link href={"/products"}>Produkty</Link>
            </li>
            <li onClick={handleToggleNav}>
              <Link href={"/categories"}>Kategorie</Link>
            </li>
            <li onClick={handleToggleNav}>
              <Link href={"/account"}>Konto</Link>
            </li>
            <li onClick={handleToggleNav}>
              <Link href={"/cart"}>Koszyk({cartProducts.length})</Link>
            </li>
          </ul>
        </div>
      </nav>
    </section>
  );
};

export default Nav;
