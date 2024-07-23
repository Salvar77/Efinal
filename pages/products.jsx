import Center from "@/components/Side/Center";
import classes from "../styles/Products.module.scss";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/Main/ProductsGrid";

const ProductsPage = ({ products }) => {
  console.log({ products });
  return (
    <div className={classes.wrapper}>
      <Center>
        {" "}
        <h1 className={classes.title}>Wszystkie produkty</h1>
        <ProductsGrid products={products} />
      </Center>
    </div>
  );
};

export default ProductsPage;

export const getServerSideProps = async () => {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
