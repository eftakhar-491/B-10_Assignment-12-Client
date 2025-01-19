import React from "react";
import Hero from "../Components/HomeComponents/Hero";
import TopScholarship from "../Components/HomeComponents/TopScholarship";
import Faqs from "../Components/HomeComponents/Faqs";
import SuccessHistory from "../Components/HomeComponents/SuccessHistory";

export default function Home() {
  return (
    <>
      <Hero />
      <TopScholarship />
      <hr />
      <SuccessHistory />
      <hr />
      <Faqs />
    </>
  );
}
