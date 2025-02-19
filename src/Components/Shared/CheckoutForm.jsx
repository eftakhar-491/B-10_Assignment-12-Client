import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Firebase/AuthProvider";
import { useNavigate } from "react-router-dom";
import StateContext from "../../Context/StateContext";
import { toast } from "react-toastify";
import { useTheme } from "../../Context/ThemeContext";
export default function CheckoutForm({ id, setPaymentModal }) {
  const { theme } = useTheme();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [err, setErr] = useState("");
  const { setApplyModal } = useContext(StateContext);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    (async () => {
      const res = await axiosSecure.post(
        `/create-payment-intent?email=${user?.email}`,
        { id }
      );
      setClientSecret(res.data.clientSecret);
    })();
  }, [axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) return;
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setErr(error.message);
      toast.error(error.message);
    } else {
      setErr("");
    }
    // confirm payment

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      toast.error(confirmError.message);
    } else {
      toast.success("Payment Success");
      await axiosSecure.post(`/applyed?email=${user?.email}`, {
        name: user?.displayName || "anonymous",
        email: user?.email,
        scholarshipId: id,
        paymentId: paymentIntent.id,
        paymentTime: paymentIntent.created,
        status: "Pending",
      });

      setApplyModal(true);
      setPaymentModal(false);
      navigate(`/ScholarshipDetails/${id}`);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          disabled={!stripe || !clientSecret}
          className={`disabled:bg-gray-400 disabled:border-gray-600 w-full mt-6 active:scale-95 text-sm md:text-lg border-2 border-blue-800 px-5 hover:bg-blue-100 py-1 rounded-lg font-bold ${
            theme ? "hover:bg-gray-900" : "hover:bg-blue-100"
          }`}
          type="submit"
        >
          Pay Now
        </button>
      </form>
    </>
  );
}
