import ProductBox from "./ProductBox";
import classes from "./ProductsGrid.module.scss";

const ProductsGrid = ({ products }) => {
  return (
    <div className={classes.styledProductsGrid}>
      {products?.length > 0 &&
        products.map((product) => (
          <ProductBox key={product._id} {...product} />
        ))}
    </div>
  );
};

export default ProductsGrid;
