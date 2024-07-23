import Link from "next/link";
import classes from "./Nav.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Logo from "./Logo";
import { signOut } from "next-auth/react";

const Nav = ({ isOpen, toggleNav }) => {
  const router = useRouter();
  const { pathname } = router;
  let navClasses = classes.nav;

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

  if (isOpen) {
    navClasses = `${classes.nav} ${classes.nav__show}`;
  }

  const logout = async (params) => {
    await router.push("/");
    await signOut();
  };

  return (
    <aside>
      <nav className={navClasses}>
        <ul aria-hidden className={classes.nav__items}>
          <li>
            <div className={classes.nav__logo}>
              <Logo />
            </div>
          </li>
          <li onClick={handleToggleNav}>
            <Link
              href={"/"}
              className={
                pathname === "/"
                  ? classes.nav__mainTwoActive
                  : classes.nav__main
              }
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={classes.nav__svg}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                />
              </svg>
              <span className={classes.nav__span}> Panel</span>
            </Link>
          </li>
          <li onClick={handleToggleNav}>
            <Link
              href={"/products"}
              className={
                pathname.includes("/products")
                  ? classes.nav__mainTwoActive
                  : classes.nav__main
              }
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={classes.nav__svg}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
              <span className={classes.nav__span}> Produkty</span>
            </Link>
          </li>
          <li onClick={handleToggleNav}>
            <Link
              href={"/categories"}
              className={
                pathname.includes("/categories")
                  ? classes.nav__mainTwoActive
                  : classes.nav__main
              }
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={classes.nav__svg}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <span className={classes.nav__span}> Kategorie</span>
            </Link>
          </li>
          <li onClick={handleToggleNav}>
            <Link
              href={"/orders"}
              className={
                pathname.includes("/orders")
                  ? classes.nav__mainTwoActive
                  : classes.nav__main
              }
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={classes.nav__svg}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                />
              </svg>
              <span className={classes.nav__span}> Zamówienia</span>
            </Link>
          </li>
          <li onClick={handleToggleNav}>
            <Link
              href={"/settings"}
              className={
                pathname.includes("/settings")
                  ? classes.nav__mainTwoActive
                  : classes.nav__main
              }
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={classes.nav__svg}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.737c.32.448.27 1.061-.12 1.45l-.773.773a1.125 1.125 0 0 1-1.45.12l-.737-.527c-.35-.25-.807-.272-1.204-.107-.397.165-.71.505-.78.93l-.15.893c-.09.543-.559.94-1.11.94h-1.094c-.55 0-1.02-.397-1.11-.94l-.149-.894c-.07-.424-.383-.764-.78-.929-.398-.165-.854-.143-1.204.107l-.737.527c-.448.32-1.061.27-1.45-.12l-.773-.773a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.807.107-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.543-.09-.94-.559-.94-1.11v-1.094c0-.55.397-1.02.94-1.11l.894-.149c.424-.07.764-.383.929-.78.165-.398.143-.854-.107-1.204l-.527-.737a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.93l.149-.893z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                />
              </svg>
              <span className={classes.nav__span}> Ustawienia</span>
            </Link>
          </li>
          <li onClick={handleToggleNav}>
            <Link onClick={logout} href={"/"} className={classes.nav__main}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={classes.nav__svg}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                />
              </svg>
              <span className={classes.nav__span}> Wyloguj</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Nav;
