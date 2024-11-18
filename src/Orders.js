import React, { useState, useEffect } from "react";
import "./Orders.css";
import { db } from "./Firebase";
import { useStateValue } from "./Stateprovider";
import Order from "./Order";

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]); // Initialize orders as an empty array

  useEffect(() => {
    // Check if the user is logged in and if db is properly initialized
    if (user && db) {
      const unsubscribe = db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot(
          (snapshot) => {
            setOrders(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          },
          (error) => {
            console.error("Error fetching orders:", error);
          }
        );

      // Clean up the listener on unmount
      return () => unsubscribe();
    } else {
      setOrders([]); // Reset orders to an empty array when user is null or db is undefined
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders_order">
        {orders.length > 0 ? (
          orders.map((order) => <Order key={order.id} order={order} />)
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
