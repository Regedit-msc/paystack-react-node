import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import "./App.css";
import axios from "axios";

const App = () => {
  const publicKey = `${process.env.REACT_APP_PAYSTACK_PUBLIC}`;
  const amount = 1000000;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Buy Now",
    onSuccess: () => {
      setEmail("");
      setName("");
      setPhone("");
      makePayment();
    },
    onClose: () => alert("Bye :("),
  };

  async function makePayment() {
    try {
      const response = await axios.post("http://localhost:4000/yaypayment", {
        ...componentProps,
      });
      console.log(response.status);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="App">
      <div className="container">
        <div className="item">
          <div className="overlay-effect"></div>
          <img
            className="item-image"
            src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="product"
          />
          <div className="item-details">
            <p className="item-details__title">Exclusive Coconuts</p>
            <p className="item-details__amount">NGN {amount / 100}</p>
          </div>
        </div>
        <div className="checkout">
          <div className="checkout-form">
            <div className="checkout-field">
              <label>Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="checkout-field">
              <label>Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="checkout-field">
              <label>Phone</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <PaystackButton className="paystack-button" {...componentProps} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;