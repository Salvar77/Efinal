import Link from "next/link";
import Button from "../Side/Button";
import classes from "./ProductBox.module.scss";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductBox = ({ _id, title, description, price, images }) => {
  const { addProduct } = useContext(CartContext);

  const url = "/product/" + _id;
  return (
    <div className={classes.productWrapper}>
      <Link href={url} className={classes.whiteBox}>
        <div>
          {" "}
          <img src={images[0]} alt="" />
        </div>
      </Link>
      <div className={classes.productInfoBox}>
        <Link href={url} className={classes.title}>
          {title}
        </Link>
        <div className={classes.priceRow}>
          <div className={classes.price}> {price} zł</div>
          <Button
            className={classes.addProduct}
            onClick={() => addProduct(_id)}
          >
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
  );
};

export default ProductBox;
