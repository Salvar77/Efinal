import { CartContextProvider } from "@/components/Main/CartContext";
import BurgerMenu from "@/components/Nav/BurgerMenu";
import Nav from "@/components/Nav/Nav";
import "@/styles/globals.scss";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {" "}
      <CartContextProvider>
        <header>
          <Nav isOpen={isOpen} toggleNav={toggleNav}></Nav>
          <BurgerMenu isOpen={isOpen} handleOpen={toggleNav}></BurgerMenu>
        </header>
        <div className="container">
          {" "}
          <Component {...pageProps} />
        </div>
      </CartContextProvider>
    </>
  );
}
