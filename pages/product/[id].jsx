const { default: Center } = require("@/components/Side/Center");
import mongooseConnect from "@/lib/mongoose";
import classes from "./Product.module.scss";
import { Product } from "@/models/Product";
import ProductImages from "@/components/Main/ProductImages";
import Button from "@/components/Side/Button";
import { useContext } from "react";
import { CartContext } from "@/components/Main/CartContext";

const ProductPage = ({ product }) => {
  const { addProduct } = useContext(CartContext);

  return (
    <Center>
      <div className={classes.colWrapper}>
        <div className={classes.whiteBox}>
          <ProductImages images={product.images} />
        </div>
        <div>
          {" "}
          <div className={classes.title}>{product.title}</div>
          <p>{product.description}</p>
          <div className={classes.priceRow}>
            <span className={classes.price}> {product.price} zł</span>

            <div>
              <Button onClick={() => addProduct(product._id)}>
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
      </div>
    </Center>
  );
};

export default ProductPage;

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
