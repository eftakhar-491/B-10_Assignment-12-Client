import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/Shared/CheckoutForm";
import { useParams } from "react-router-dom";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
export default function Payment() {
  const { id } = useParams();
  return (
    <>
      <section className="mt-[80px]">
        <div className="max-w-[800px] mx-auto bg-white p-5 rounded-2xl">
          <Elements stripe={stripePromise}>
            <CheckoutForm id={id} />
          </Elements>
        </div>
      </section>
    </>
  );
}
