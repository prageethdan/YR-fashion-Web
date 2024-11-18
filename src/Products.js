import React from "react";
import "./Products.css";
import { useStateValue } from "./Stateprovider";
import { v4 as uuidv4 } from "uuid";

function Products({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: uuidv4(),
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="products">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {Array.from({ length: rating }, (_, i) => (
            <p key={i}>⭐</p>
          ))}
        </div>
      </div>
      <img className="img" src={image} alt={title} />
      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
}

export default Products;
