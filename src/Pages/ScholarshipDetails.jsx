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
import { useTheme } from "../Context/ThemeContext";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
export default function ScholarshipDetails() {
  const { theme } = useTheme();
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

  return (
    <>
      <h1 className="text-2xl font-Lora font-semibold text-center mt-40 mb-10">
        Scholarship Details
      </h1>
      {applyModal && <ApplyedDetailsForm data={scholarshipDetails} />}
      <section className="font-Roboto">
        <div
          className={`border max-w-[1000px] mx-auto  ${
            theme ? "bg-black" : "bg-white"
          } p-5 rounded-lg`}
        >
          <div className="mb-6 flex flex-col md:flex-row md:items-center gap-5">
            <img
              className="md:w-[300px] rounded-lg"
              src={scholarshipDetails?.universityImage}
              alt="no image found"
            />
            <div>
              <h1 className="text-xl font bold">
                <span className="font-semibold">University Name: </span>{" "}
                {scholarshipDetails?.universityName || "no data found"}
              </h1>
              <p>
                <span className="font-semibold">Country: </span>{" "}
                {scholarshipDetails?.universityCountry || "no data found"}
              </p>
              <p>
                <span className="font-semibold">City: </span>
                {scholarshipDetails?.universityCity || "no data found"}
              </p>
              <p>
                <span className="font-semibold">Degree: </span>
                {scholarshipDetails?.degree || "no data found"}
              </p>
              <p>
                {" "}
                <span className="font-semibold">Deadline: </span>{" "}
                {scholarshipDetails?.applicationDeadline || "no data found"}
              </p>
            </div>
          </div>
          <hr />
          <div className="mt-6">
            <p className="text-sm border-2 border-blue-700 w-fit px-4 rounded-3xl">
              {scholarshipDetails?.scholarshipCategory || "no data found"}
            </p>
            <p>
              <span className="font-semibold">Description:</span>
              {scholarshipDetails?.description || "no data found"}
            </p>
            <p>
              <span className="font-semibold">World Rank: </span>
              {scholarshipDetails?.universityWorldRank || "no data found"}
            </p>
            <p>
              {" "}
              <span className="font-semibold">Subject name: </span>
              {scholarshipDetails?.subjectCategory || "no data found"}
            </p>
            <p>
              {" "}
              <span className="font-semibold">Posted By: </span>
              {scholarshipDetails?.postedBy || "no data found"}
            </p>
            <p>
              <span className="font-semibold">Post date: </span>
              {fullDate || "no data found"}
            </p>
            <p>
              <span className="font-semibold">Application fees (USD): </span>${" "}
              {scholarshipDetails?.applicationFees || "no data found"}
            </p>
            <p>
              <span className="font-semibold">Service charge (USD): </span>${" "}
              {scholarshipDetails?.serviceCharge || "no data found"}
            </p>
            <p>
              <span className="font-semibold">Tuition fees (USD): </span>${" "}
              {scholarshipDetails?.tuitionFees || "no data found"}
            </p>
          </div>
          <button
            onClick={() => {
              setPaymentModal(true);
            }}
            className={`mt-3 w-full active:scale-95 text-sm md:text-lg border-2 border-blue-800 px-5 hover:bg-blue-100 py-1 rounded-lg font-bold ${
              theme ? "hover:bg-gray-900" : "hover:bg-blue-100"
            }`}
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
          <p className="text-center mt-10 text-red-400">"no review found"</p>
        ) : (
          <>
            <h1 className="text-2xl font-Lora font-semibold text-center mt-10">
              Reviews
            </h1>
            <div
              className={`${
                theme ? "bg-black" : "bg-white"
              } max-w-[1000px] mx-auto mt-5 rounded-lg border`}
            >
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
      </section>
    </>
  );
}
