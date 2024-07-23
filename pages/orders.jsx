import Layout from "@/components/Main/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "../styles/Orders.module.scss";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
    <Layout>
      <h1>Zamówienia</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Data</th>
            <th>Zapłacone</th>
            <th>Odbiorca</th>
            <th>Produkty</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? classes.green : classes.red}>
                  {order.paid ? "TAK" : "NIE"}
                </td>
                <td>
                  {order.name} {order.email}
                  <br />
                  {order.city} {order.postalCode}
                  {order.country}
                  <br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <div>
                      {l.price_data?.product_data.name} x {l.quantity}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Orders;
