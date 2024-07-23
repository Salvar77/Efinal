import { useState } from "react";
import classes from "./ProductImages.module.scss";

const ProductImages = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <div>
      <div className={classes.bigImageWrapper}>
        {" "}
        <img className={classes.bigImage} src={activeImage} />
      </div>

      <div className={classes.imageButtons}>
        {images.map((image) => (
          <div
            className={classes.imageButton}
            onClick={() => setActiveImage(image)}
            active={image === activeImage}
            key={image}
          >
            <img src={image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
