import React from "react";
import Center from "@/components/Side/Center";
import classes from "../styles/Cart.module.scss";
import Button from "@/components/Side/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/Main/CartContext";
import axios from "axios";
import Table from "@/components/Side/Table";
import Input from "@/components/Side/Input";

const CartPage = () => {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.href.includes("success")
    ) {
      clearCart();
      setIsSuccess(true);
    }
  }, []);

  const moreOfThisProduct = (id) => {
    addProduct(id);
  };
  const lessOfThisProduct = (id) => {
    removeProduct(id);
  };

  const goToPayment = async () => {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  };

  let total = 0;

  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <div>
        <Center>
          <div className={classes.columnsWrapper}>
            <div className={classes.box}>
              <h1>Płatność przebiegła pomyślnie!</h1>
              <p>Wyślemy emaila z potwierdzeniem zakupu.</p>
            </div>
          </div>
        </Center>
      </div>
    );
  }

  return (
    <Center>
      <div className={classes.columnsWrapper}>
        <div className={classes.box}>
          {!cartProducts.length && <div>Twój koszyk jest pusty</div>}
          <h2>Koszyk</h2>
          {products.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <th>Produkt</th>
                  <th>Ilość</th>
                  <th>Cena</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className={classes.productInfoCell}>
                      <div className={classes.productImageBox}>
                        <img src={product.images[0]} alt="" />
                      </div>
                      {product.title}
                    </td>
                    <td>
                      <Button onClick={() => lessOfThisProduct(product._id)}>
                        -
                      </Button>
                      <span className={classes.quantityLabel}>
                        {cartProducts.filter((id) => id === product._id).length}
                      </span>
                      <Button onClick={() => moreOfThisProduct(product._id)}>
                        +
                      </Button>
                    </td>
                    <td>
                      {cartProducts.filter((id) => id === product._id).length *
                        product.price}{" "}
                      zł
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td>{total} zł</td>
                </tr>
              </tbody>
            </Table>
          )}
        </div>
        {!!cartProducts.length && (
          <div className={classes.box}>
            <h2>Informacje o zamówieniu</h2>
            <Input
              type="text"
              placeholder="Imię"
              value={name}
              name="name"
              onChange={(ev) => setName(ev.target.value)}
            />
            <Input
              type="text"
              placeholder="Email"
              value={email}
              name="email"
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <div className={classes.postal}>
              <Input
                type="text"
                placeholder="Miasto"
                value={city}
                name="city"
                onChange={(ev) => setCity(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Kod Pocztowy"
                value={postalCode}
                name="postalCode"
                onChange={(ev) => setPostalCode(ev.target.value)}
              />
            </div>
            <Input
              type="text"
              placeholder="Ulica"
              value={streetAddress}
              name="streetAddress"
              onChange={(ev) => setStreetAddress(ev.target.value)}
            />
            <Input
              type="text"
              placeholder="Kraj"
              value={country}
              name="country"
              onChange={(ev) => setCountry(ev.target.value)}
            />
            <input
              type="hidden"
              name="products"
              value={cartProducts.join(",")}
            />
            <button onClick={() => goToPayment()} className={classes.styled}>
              Kontynuuj do płatności
            </button>
          </div>
        )}
      </div>
    </Center>
  );
};

export default CartPage;
