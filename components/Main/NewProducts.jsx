import Center from "../Side/Center";
import classes from "./NewProducts.module.scss";
import ProductsGrid from "./ProductsGrid";

const NewProducts = ({ products }) => {
  return (
    <Center>
      <h2 className={classes.title}>Nowości!</h2>
      <ProductsGrid products={products} />
    </Center>
  );
};

export default NewProducts;
