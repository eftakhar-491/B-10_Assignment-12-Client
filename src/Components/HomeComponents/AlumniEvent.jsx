import React from "react";

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
  return (
    <section className=" py-12 md:px-8">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-3xl font-semibold">Alumni Event</h2>
      </div>
      <div className="max-w-[1900px] mx-auto px-[5%] grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 flex flex-col justify-center rounded-lg space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex space-x-4 group cursor-pointer hover:bg-gray-100 p-4 rounded-lg transition"
            >
              <span className="text-4xl text-gray-300 font-semibold">
                {event.id}
              </span>
              <div>
                <h3 className="text-lg font-medium text-black group-hover:underline">
                  {event.title}
                </h3>
                <p className="text-sm flex-wrap text-gray-600 flex items-center gap-x-3">
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
