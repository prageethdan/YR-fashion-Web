import React from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import { NumericFormat } from "react-number-format";
import { useStateValue } from "./Stateprovider";
import { getBasketTotal } from "./reducer";

function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMM Do YYYY, h:mma")}</p>

      <p className="order_id">
        <small>{order.id}</small>
      </p>

      {order.data.basket?.map((item) => (
        <CheckoutProduct
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton={true}
        />
      ))}

      <NumericFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({order.data.basket?.length} items):{" "}
              <strong>{value}</strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(order.data.basket)} // Calculate the total for this order's basket
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Order;
