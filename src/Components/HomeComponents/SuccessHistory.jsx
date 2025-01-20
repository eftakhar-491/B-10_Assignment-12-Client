import React from "react";

export default function SuccessHistory() {
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
        "https://thumbs.dreamstime.com/b/hr-having-job-interviews-25917876.jpg",
      title: "Freelance Success",
      difficulty: "Advanced",
      history:
        "Secured freelance projects, delivering high-quality web applications.",
    },
    {
      id: 3,
      image:
        "https://thumbs.dreamstime.com/b/law-consultation-subordination-teamwork-business-report-successful-business-man-woman-boss-manager-director-business-law-190650415.jpg",
      title: "Hackathon Winner",
      difficulty: "Expert",
      history:
        "Won a national hackathon by building an innovative AI-powered solution.",
    },
  ];
  return (
    <>
      <section className="bg-gray-100 py-12 px-6 md:px-16 ">
        <div className="max-w-[1900px] mx-auto px-[5%]">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Success Stories
            </h2>
            <p className="text-gray-600 mb-12">
              Inspiring success stories from our community members who achieved
              their goals.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {successData.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    <span className="font-bold">Difficulty:</span>{" "}
                    {item.difficulty}
                  </p>
                  <p className="text-gray-700">{item.history}</p>
                </div>
              </div>
            ))}
          </div>{" "}
        </div>
      </section>
    </>
  );
}
