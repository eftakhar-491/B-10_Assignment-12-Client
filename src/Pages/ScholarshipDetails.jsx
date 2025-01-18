import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ApplyedDetailsForm from "../Components/ModalComponents/ApplyedDetailsForm";
import { useContext, useState } from "react";
import StateContext from "../Context/StateContext";
import moment from "moment";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Firebase/AuthProvider";
import Payment from "../Components/Shared/Payment";
import ReviewShowCard from "../Components/Shared/ReviewShowCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
export default function ScholarshipDetails() {
  const [paymentModal, setPaymentModal] = useState(false);
  const { applyModal, setApplyModal } = useContext(StateContext);
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    data: scholarshipDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["scholarship", id],
    enabled: id && user?.email ? true : false,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/scholarship/details/${id}?email=${user?.email}`
      );
      return res.data;
    },
  });

  const fullDate =
    !isLoading &&
    moment(Number(scholarshipDetails?.scholarshipPostDate)).format(
      "YYYY-MM-DD"
    );

  const { data: allReviews } = useQuery({
    queryKey: ["reviewsDetails", id],
    enabled: id && user?.email ? true : false,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/reviews/details/${id}?email=${user?.email}`
      );
      return res.data;
    },
  });
  console.log("details-->", allReviews);

  return (
    <>
      {applyModal && <ApplyedDetailsForm data={scholarshipDetails} />}
      <section className="font-Roboto mt-40">
        <div className="max-w-[1000px] mx-auto mt-[80px] bg-white p-5 rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <img
              className="md:w-[300px] rounded-lg"
              src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
              alt=""
            />
            <div>
              <h1 className="text-xl font bold">
                <span className="font-semibold">University Name: </span>{" "}
                {scholarshipDetails?.universityName}
              </h1>
              <p>
                <span className="font-semibold">Country: </span>{" "}
                {scholarshipDetails?.universityCountry}
              </p>
              <p>
                <span className="font-semibold">City: </span>
                {scholarshipDetails?.universityCity}
              </p>
              <p>
                <span className="font-semibold">Degree: </span>
                {scholarshipDetails?.degree}
              </p>
              <p>
                {" "}
                <span className="font-semibold">Deadline: </span>{" "}
                {scholarshipDetails?.applicationDeadline}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm border-2 border-blue-700 w-fit px-4 rounded-3xl">
              {scholarshipDetails?.scholarshipCategory}
            </p>
            <p>
              <span className="font-semibold">Description:</span>
              {scholarshipDetails?.description}
            </p>
            <p>
              <span className="font-semibold">World Rank: </span>
              {scholarshipDetails?.universityWorldRank}
            </p>
            <p>
              {" "}
              <span className="font-semibold">Subject name: </span>
              {scholarshipDetails?.subjectCategory}
            </p>
            <p>
              {" "}
              <span className="font-semibold">Posted By: </span>
              {scholarshipDetails?.postedBy}
            </p>
            <p>
              <span className="font-semibold">Post date: </span>
              {fullDate}
            </p>
            <p>
              <span className="font-semibold">Application fees (USD): </span>${" "}
              {scholarshipDetails?.applicationFees}
            </p>
            <p>
              <span className="font-semibold">Service charge (USD): </span>${" "}
              {scholarshipDetails?.serviceCharge}
            </p>
            <p>
              <span className="font-semibold">Service charge (USD): </span>${" "}
              {scholarshipDetails?.tuitionFees}
            </p>
          </div>
          <button
            onClick={() => {
              setPaymentModal(true);
            }}
            className="mt-3 w-full active:scale-95 text-sm md:text-lg border-2 border-blue-800 px-5 hover:bg-blue-100 py-1 rounded-lg font-bold"
          >
            Apply Scholarship
          </button>
        </div>
        {paymentModal && (
          <Payment
            setPaymentModal={setPaymentModal}
            id={scholarshipDetails?._id}
          />
        )}
        {allReviews?.length === 0 ? (
          ""
        ) : (
          <>
            <h1 className="text-2xl font-Lora font-semibold text-center mt-10">
              Reviews
            </h1>
            <div className=" max-w-[1000px] mx-auto mt-5 bg-white rounded-lg">
              <Swiper
                spaceBetween={0}
                centeredSlides={true}
                slidesPerView={1}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                {allReviews?.map((item, i) => (
                  <SwiperSlide key={i + "reviewDetails"}>
                    <ReviewShowCard data={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>{" "}
          </>
        )}
        {/* <ReviewShowCard /> */}
      </section>
    </>
  );
}
