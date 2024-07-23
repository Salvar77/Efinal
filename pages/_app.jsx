import "@/styles/globals.scss";
import Nav from "@/components/Nav/Nav";
import BurgerMenu from "@/components/Nav/BurgerMenu";
import "hamburgers/dist/hamburgers.min.css";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <SessionProvider session={session}>
        <header>
          <Nav isOpen={isOpen} toggleNav={toggleNav} />
          <BurgerMenu isOpen={isOpen} handleOpen={toggleNav} />
        </header>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
