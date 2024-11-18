import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./Stateprovider";
import FlipMove from "react-flip-move";

const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    console.log("Removing item with ID:", id); // Debug log
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <FlipMove duration={500} easing="ease-out">
      <div key={id} className="checkout_product">
        <img className="checkoutProduct_image" src={image} alt={title} />
        <div className="product_info">
          <p className="product_title">{title}</p>
          <p className="product_price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="product_rating">
            {Array.from({ length: rating }, (_, i) => (
              <p key={i}>⭐</p>
            ))}
          </div>
          {!hideButton && (
            <button onClick={removeFromBasket} className="remove_button">
              Remove from basket
            </button>
          )}
        </div>
      </div>
    </FlipMove>
  );
};

export default CheckoutProduct;
