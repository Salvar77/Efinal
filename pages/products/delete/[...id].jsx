import Layout from "@/components/Main/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import classes from "../../../styles/Delete.module.scss";

const DeleteProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [productInfo, setProductInfo] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  const goBack = () => {
    router.push("/products");
  };

  const deleteProduct = async () => {
    await axios.delete("/api/products?id=" + id);
    goBack();
  };

  return (
    <Layout>
      <h2 className={classes.h2}>
        Czy na pewno chcesz usunąć &nbsp;"{productInfo?.title}"
      </h2>
      <div className={classes.delete}>
        <button onClick={deleteProduct} className="btn-red">
          TAK
        </button>
        <button className="btn-default" onClick={goBack}>
          NIE
        </button>
      </div>
    </Layout>
  );
};

export default DeleteProductPage;
