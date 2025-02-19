import React from "react";
import Hero from "../Components/HomeComponents/Hero";
import TopScholarship from "../Components/HomeComponents/TopScholarship";
import Faqs from "../Components/HomeComponents/Faqs";
import SuccessHistory from "../Components/HomeComponents/SuccessHistory";
import Faculties from "../Components/HomeComponents/Faculties";
import CampusLife from "../Components/HomeComponents/CampusLife";
import AlumniEvent from "../Components/HomeComponents/AlumniEvent";
import UniversityCards from "../Components/HomeComponents/UniversityCards";
export default function Home() {
  return (
    <>
      <Hero />
      <TopScholarship />
      <hr />
      <SuccessHistory />
      <hr />
      <UniversityCards />
      <hr />
      <Faculties />
      <hr />
      <CampusLife />
      <hr />
      <AlumniEvent />
      <hr />
      <Faqs />
      <hr />
    </>
  );
}
