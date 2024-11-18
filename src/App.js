import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Orders from "./Orders";
import { auth } from "./Firebase";
import { useStateValue } from "./Stateprovider";
import Payments from "./Payments";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51QIVUnD51c2XO9u4V3WV0a4xgyyYfV3jPpouY2Grf5yW4dwgMNI5p7v6rZt8M5DTmPkd1E9bjxCXSCCuyFLaYhdf00Sbm6pAon"
);

const Checkout = React.lazy(() => import("./Checkout"));

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>>", authUser);

      if (authUser) {
        // The user is logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // The user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/checkout"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Checkout />
              </Suspense>
            }
          />
          <Route
            path="/payment"
            element={
              <Elements stripe={promise}>
                <Payments />
              </Elements>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
