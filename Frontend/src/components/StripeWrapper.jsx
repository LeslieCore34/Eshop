import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "../pages/Payment";

const stripePromise = loadStripe(
  "pk_test_51PFxlOGu4iTW4NJ3Rkk8WCK9p6P315Ks6aN2A4VHSDgPNNnVW6vQ1mf3xQhgVMq5jl1RdNiGqFbArem2EBSsDkOT00fu0siW5b"
);

export default function StripeWrapper() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:3310/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <Payment />
        </Elements>
      )}
    </div>
  );
}
