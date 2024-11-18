import React, { useEffect, useState } from "react";
import "./Payments.css";
import { useStateValue } from "./Stateprovider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom"; // Replaced useHistory with useNavigate
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { NumericFormat } from "react-number-format";
import { getBasketTotal } from "./reducer";
import axios from "axios"; // Temporarily use "axios" directly to troubleshoot
import { db } from "./Firebase";

export default function Payments() {
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); // Replaced useHistory with useNavigate

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disable, setDisable] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  // Logging axios instance to verify import
  console.log("Axios instance:", axios);

  useEffect(() => {
    const testAxiosConnection = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5001/yr-challenge/us-central1/api"
        ); // Updated for direct import
        console.log("GET request successful:", response.data);
      } catch (error) {
        console.error("Error in GET request:", error.message);
      }
    };

    testAxiosConnection();
  }, []);

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: "post",
          url: `http://127.0.0.1:5001/yr-challenge/us-central1/api/payments/create?total=${getBasketTotal(basket) * 100}`,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error.message);
      }
    };
    getClientSecret();
  }, [basket]);

  console.log("THE SECRET IS>>", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      try {
        await db
          .collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
      } catch (firestoreError) {
        console.error("Error saving to Firestore:", firestoreError);
        setError(`Failed to save order: ${firestoreError.message}`);
      }

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      dispatch({
        type: "EMPTY_BASKET",
      });

      navigate("/orders"); // Replace history.replace with navigate
    } catch (error) {
      setError(`Payment failed: ${error.message}`);
      setProcessing(false);
    }
  };

  const handleChange = (event) => {
    setDisable(event.empty);
    setError(event.error ? event.error.message : "");
  };

  // Debugging: Log the basket to check its contents
  console.log("Basket:", basket);

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length || 0} items</Link>)
        </h1>

        {/* Delivery Address Section */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Review Items Section */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
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

        {/* Payment Method Section */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="price_container">
                <NumericFormat
                  value={getBasketTotal(basket)}
                  displayType="text"
                  thousandSeparator={true}
                  prefix={"$"}
                  renderText={(value) => (
                    <>
                      <p>
                        Subtotal ({basket?.length} items):{" "}
                        <strong>{value}</strong>
                      </p>
                    </>
                  )}
                />
              </div>
              <button
                disabled={processing || disable || succeeded}
                type="submit"
              >
                <span>{processing ? <p>Processing...</p> : "Buy Now"}</span>
              </button>
              {error && <div className="payment_error">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
