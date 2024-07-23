import Featured from "@/components/Main/Featured";
import NewProducts from "@/components/Main/NewProducts";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styles from "@/styles/Home.module.scss";

export default function Home({ featuredProduct, newProducts }) {
  return (
    <div>
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const featuredProductId = "6696c5aed1eb53d68b607817";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
};
