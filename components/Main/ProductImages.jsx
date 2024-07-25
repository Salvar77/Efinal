import { useState } from "react";
import classes from "./ProductImages.module.scss";

const ProductImages = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <div>
      <div className={classes.bigImageWrapper}>
        {" "}
        <img
          className={classes.bigImage}
          src={activeImage}
          alt="Active Product"
        />
      </div>

      <div className={classes.imageButtons}>
        {images.map((image) => (
          <div
            className={`${classes.imageButton} ${
              image === activeImage ? classes.active : ""
            }`}
            onClick={() => setActiveImage(image)}
            key={image}
          >
            <img src={image} alt="Product Thumbnail" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
