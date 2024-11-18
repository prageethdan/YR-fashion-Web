import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./Stateprovider";
import CheckoutProduct from "./CheckoutProduct";

const Checkout = () => {
  const [{ basket }, dispatch] = useStateValue();

  console.log("Basket contents:", basket); // Debug log

  return (
    <div className="checkout">
      <div className="checkout-left">
        <img
          className="checkout_add"
          src="images/banner-advertising-online.png"
          alt="add"
        />
        <div>
          <h2 className="checkout_title">Your shopping basket</h2>

          {basket?.map((item) => (
            <CheckoutProduct
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="checkout-right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
