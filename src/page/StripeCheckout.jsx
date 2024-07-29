import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "../index.css";
import CheckoutForm from "../component/CheckoutForm";
import { selectCurrentOrder } from "../features/Order/orderSlice";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(
  "pk_test_51Ph8WCRrpWOVPdAAr7n9GuVRmcHAv9JgHlaZnlgM3cXUcXfN5GYFmacRFMhOZ3jDcFspO8Il7M3IKh5Np4bpRiJO00PfLFwVAR"
);

export default function StripeCheckout() {
  const currentOrder = useSelector(selectCurrentOrder);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalAmount: currentOrder.totalAmount,
        orderId: currentOrder.id,
      }),
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
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
