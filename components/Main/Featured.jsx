import Center from "../Side/Center";
import classes from "./Featured.module.scss";
import foto from "../../assets/image/books1.jpg";
import Image from "next/image";
import Button from "../Side/Button";
import ButtonLink from "../Side/ButtonLink";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Featured = ({ product }) => {
  const { addProduct } = useContext(CartContext);

  const addFeaturedToCart = () => {
    addProduct(product._id);
  };

  return (
    <div className={classes.featured}>
      <Center>
        <div className={classes.wrapper}>
          <div className={classes.column}>
            <div>
              <h1 className={classes.title}>{product.title}</h1>
              <p className={classes.desc}>{product.description}</p>
              <div className={classes.buttonsWrapper}>
                {" "}
                <ButtonLink
                  href={"/product/" + product._id}
                  className={classes.button}
                >
                  Czytaj więcej
                </ButtonLink>
                <Button onClick={addFeaturedToCart}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={classes.svg}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  Dodaj do koszyka
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.columno}>
            <Image src={foto} alt=""></Image>
          </div>
        </div>
      </Center>
    </div>
  );
};

export default Featured;
