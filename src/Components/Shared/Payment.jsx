import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
export default function Payment({ id, setPaymentModal }) {
  const { theme } = useTheme();
  // const { id } = useParams();
  return (
    <>
      <section className="mt-5">
        <div
          className={`max-w-[1000px] mx-auto border ${
            theme ? "bg-black" : "bg-white"
          } p-5 rounded-2xl`}
        >
          <Elements stripe={stripePromise}>
            <CheckoutForm id={id} setPaymentModal={setPaymentModal} />
          </Elements>
        </div>
      </section>
    </>
  );
}
