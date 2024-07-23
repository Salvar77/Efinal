import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import classes from "./ProductForm.module.scss";
import Spinner from "../Side/Spinner";
import { ReactSortable } from "react-sortablejs";

const ProductForm = ({
  _id,
  title: existingTitle,
  description: exisitingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assginedProperties,
}) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(exisitingDescription || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assginedProperties || {}
  );
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);

  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  const saveProduct = async (ev) => {
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };
    if (_id) {
      // update
      await axios.put("/api/products", { ...data, _id });
    } else {
      // create
      await axios.post("/api/products", { ...data, _id });
    }
    setGoToProducts(true);
  };

  if (goToProducts) {
    router.push("/products");
  }

  const uploadImages = async (ev) => {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  };

  const updateImagesOrder = (newOrder) => {
    setImages(newOrder);
  };

  const setProductProp = (propName, value) => {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  };

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Nazwa Produktu</label>
      <input
        type="text"
        placeholder="Nazwa Produktu"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Kategoria</label>
      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value="">Nieskategoryzowane</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((p) => (
          <div className={classes.properties}>
            <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
            <select
              value={productProperties[p.name]}
              onChange={(ev) => setProductProp(p.name, ev.target.value)}
            >
              {p.values.map((v) => (
                <option value={v}>{v}</option>
              ))}
            </select>
          </div>
        ))}
      <label>Zdjęcia</label>
      <div className={classes.photo}>
        <ReactSortable
          list={images}
          setList={updateImagesOrder}
          className={classes.sortable}
        >
          {!!images?.length &&
            images.map((link) => (
              <div key={link} className={classes.photo__link}>
                <img src={link} alt="" className={classes.photo__img} />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className={classes.upload}>
            <Spinner />
          </div>
        )}
        <label className={classes.photo__btn}>
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
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Dodaj zdjęcie</div>
          <input
            type="file"
            onChange={uploadImages}
            className={classes.photo__file}
          />
        </label>
      </div>
      <label>Opis</label>
      <textarea
        placeholder="opis"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      ></textarea>
      <label>Cena (w PLN)</label>
      <input
        type="number"
        placeholder="cena"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />

      <button type="submit " className="btn-primary">
        Zapisz
      </button>
    </form>
  );
};

export default ProductForm;
