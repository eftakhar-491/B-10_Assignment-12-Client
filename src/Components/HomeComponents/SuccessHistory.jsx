import React from "react";
import { useTheme } from "../../Context/ThemeContext";

export default function SuccessHistory() {
  const { theme } = useTheme();
  const successData = [
    {
      id: 1,
      image:
        "https://media.istockphoto.com/id/1319763433/photo/multiethnic-couple-handshake-with-consultant-at-home.jpg?s=612x612&w=0&k=20&c=uW5-DzuIB5mrQNxN_j_fd6QjVAmtdbeTZf7geXPlRsA=", // Replace with actual image URLs
      title: "Web Development Bootcamp",
      difficulty: "Intermediate",
      history:
        "Completed an intensive 6-month bootcamp, mastering React and Next.js.",
    },
    {
      id: 2,
      image:
        "https://img.freepik.com/premium-photo/graduation-portrait-diploma-people-university-education-learning-success-achievement-scholarship-award-certificate-graduate-college-students-face-friends-celebration_590464-192497.jpg",
      title: "Freelance Success",
      difficulty: "Advanced",
      history:
        "Secured freelance projects, delivering high-quality web applications.",
    },
    {
      id: 3,
      image:
        "https://media.istockphoto.com/id/1406888053/photo/a-group-of-cheerful-people-at-graduation-holding-diplomas-or-certificates-up-together-and.jpg?s=612x612&w=0&k=20&c=8LRkx77cpb1clqj2tHqOY--uO8Mj6DB8Qd1Y3RdDRyQ=",
      title: "Hackathon Winner",
      difficulty: "Expert",
      history:
        "Won a national hackathon by building an innovative AI-powered solution.",
    },
  ];
  return (
    <>
      <section
        className={`py-12 px-6 md:px-16 ${theme ? "bg-black" : "bg-gray-100"}`}
      >
        <div className="max-w-[1900px] mx-auto px-[5%]">
          <div className="max-w-5xl mx-auto text-center">
            <h2
              className={`text-3xl md:text-4xl font-bold  mb-6 ${
                theme ? "text-white" : "text-gray-800"
              }`}
            >
              Success Stories
            </h2>
            <p className={` mb-12 ${theme ? "text-white" : "text-gray-600"}`}>
              Inspiring success stories from our community members who achieved
              their goals.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {successData.map((item) => (
              <div
                key={item.id}
                className={`border shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 ${
                  theme ? "bg-black" : "bg-white"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3
                    className={`text-xl font-semibold ${
                      theme ? "text-white" : "text-gray-800"
                    } mb-2`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-gray-600 text-sm mb-4 ${
                      theme ? "text-white" : "text-gray-600"
                    }`}
                  >
                    <span className="font-bold">Difficulty:</span>{" "}
                    {item.difficulty}
                  </p>
                  <p
                    className={`text-gray-700 ${
                      theme ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {item.history}
                  </p>
                </div>
              </div>
            ))}
          </div>{" "}
        </div>
      </section>
    </>
  );
}
