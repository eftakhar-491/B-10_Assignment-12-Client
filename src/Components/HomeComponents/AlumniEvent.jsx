import React from "react";
import { useTheme } from "../../Context/ThemeContext";
const events = [
  {
    id: "01",
    title: "Cultural Exchange: Building Global Connections",
    date: "August 20, 2024",
    time: "4:27 am",
    location: "Yarra Park, UK",
  },
  {
    id: "02",
    title: "Literary Voices: Celebrating Diverse Narratives",
    date: "August 20, 2024",
    time: "4:27 am",
    location: "Yarra Park, UK",
  },
  {
    id: "03",
    title: "Bridging Cultures: Global Perspectives in",
    date: "August 20, 2024",
    time: "4:27 am",
    location: "Yarra Park, UK",
  },
];

const AlumniEvent = () => {
  const { theme } = useTheme();
  return (
    <section className=" py-12 md:px-8">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-3xl font-semibold">Alumni Event</h2>
      </div>
      <div className="max-w-[1900px] mx-auto px-[5%] grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`p-6 flex flex-col justify-center rounded-lg space-y-6 ${
            theme ? "bg-black" : "bg-gray-50"
          }`}
        >
          {events.map((event) => (
            <div
              key={event.id}
              className={`flex space-x-4 group p-4 rounded-lg transition ${
                theme ? " hover:bg-gray-900" : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <span
                className={`text-4xl ${
                  theme ? "text-gray-300" : "text-gray-800"
                } font-semibold`}
              >
                {event.id}
              </span>
              <div>
                <h3
                  className={`text-lg font-medium ${
                    theme ? "text-white" : "text-black"
                  } group-hover:underline`}
                >
                  {event.title}
                </h3>
                <p
                  className={`text-sm flex-wrap ${
                    theme ? "text-white" : "text-gray-600"
                  } flex items-center gap-x-3`}
                >
                  <span>📅 {event.date}</span>
                  <span>⏰ {event.time}</span>
                  <span>
                    📍{" "}
                    <a href="#" className="underline">
                      {event.location}
                    </a>
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <img
            src="https://industry.ehl.edu/hubfs/Scholarship%20of%20Teaching%20&%20Learning%202025.jpg"
            alt="Event"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default AlumniEvent;
