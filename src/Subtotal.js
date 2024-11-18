import React from "react";
import { NumericFormat } from "react-number-format";
import "./Subtotal.css";
import { useStateValue } from "./Stateprovider";
import { useNavigate } from "react-router-dom"; // Updated for v6

function Subtotal() {
  const navigate = useNavigate(); // Use navigate instead of useHistory
  const [{ basket }] = useStateValue();

  const getBasketTotal = (basket) => {
    return basket?.reduce((amount, item) => item.price + amount, 0);
  };

  return (
    <div className="subTotal">
      <NumericFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} items):
              <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={() => navigate("/payment")}>Proceed to checkout</button>
    </div>
  );
}

export default Subtotal;
