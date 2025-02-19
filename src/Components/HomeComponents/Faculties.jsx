import React from "react";
const faculties = [
  {
    title: "Nursing, DNP",
    description:
      "We are a team of dedicated professionals who are committed to providing the best possible education to our students.",
    image:
      "https://bouve.northeastern.edu/wp-content/uploads/2024/05/msn-vs-dnp-degree-nursing.jpg", // Replace with actual image URL
  },
  {
    title: "M.A. in Education",
    description:
      "We are a team of dedicated professionals who are committed to providing the best possible education to our students.",
    image:
      "https://www.mdis.edu.sg/blog/wp-content/uploads/2021/01/FOR-BLOG-Q4-7.png",
  },
  {
    title: "Business Administration",
    description:
      "We are a team of dedicated professionals who are committed to providing the best possible education to our students.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFYSQ_ULpubhfb6rQgKXfW-EJdpnCnC_S63Q&s",
  },
  {
    title: "Economics, BA",
    description:
      "We are a team of dedicated professionals who are committed to providing the best possible education to our students.",
    image:
      "https://lectera.com/info/storage/img/20220610/36690d0889a690fcddbe_808xFull.jpg",
  },
];
export default function Faculties() {
  return (
    <section className="mb-10">
      <div className="max-w-[1900px] mx-auto px-[5%]">
        <h2 className="text-4xl text-center mt-16 font-serif font-bold mb-8">
          OUR FACULTY
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculties.map((faculty, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={faculty.image}
                alt={faculty.title}
                className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-semibold">
                  {faculty.title}
                </h3>
                <p className="text-white text-sm mt-2 inline-block border-b border-white pb-1">
                  About Faculty → {faculty?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
