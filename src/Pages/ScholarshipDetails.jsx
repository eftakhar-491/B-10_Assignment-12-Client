import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ApplyedDetailsForm from "../Components/ModalComponents/ApplyedDetailsForm";
import { useContext } from "react";
import StateContext from "../Context/StateContext";

export default function ScholarshipDetails() {
  const { applyModal } = useContext(StateContext);
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const {
    data: scholarshipDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APIURL}/scholarship/details/${id}`
      );
      return res.data;
    },
  });
  console.log(scholarshipDetails);

  const date = new Date(scholarshipDetails?.scholarshipPostDate);
  const fullDate = isLoading || date.toISOString().split("T")[0];
  console.log(fullDate);
  return (
    <>
      {applyModal && <ApplyedDetailsForm data={scholarshipDetails} />}
      <section className="font-Roboto">
        <div className="max-w-[800px] mx-auto mt-[80px] bg-white p-5 rounded-lg">
          <div className="flex items-center gap-5">
            <img
              className="w-[300px] rounded-lg"
              src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
              alt=""
            />
            <div>
              <h1 className="text-xl font bold">
                {scholarshipDetails?.universityName}
              </h1>
              <p>{scholarshipDetails?.universityCountry}</p>
              <p>{scholarshipDetails?.universityCity}</p>
              <p>{scholarshipDetails?.applicationDeadline}</p>
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
              {" "}
              <span className="font-semibold">Subject name: </span>
              {scholarshipDetails?.subjectCategory}
            </p>
            <p>
              <span className="font-semibold">Post date: </span>
              {fullDate}
            </p>
            <p>
              <span className="font-semibold">Application fees(BDT): </span>
              {scholarshipDetails?.applicationFees} TK
            </p>
            <p>
              <span className="font-semibold">Service charge(BDT): </span>
              {scholarshipDetails?.serviceCharge} TK
            </p>
          </div>
          <button
            onClick={() => navigate(`/payment/${scholarshipDetails?._id}`)}
            className="mt-3 w-full active:scale-95 text-sm md:text-lg border-2 border-blue-800 px-5 hover:bg-blue-100 py-1 rounded-lg font-bold"
          >
            Apply Scholarship
          </button>
        </div>
      </section>
    </>
  );
}
