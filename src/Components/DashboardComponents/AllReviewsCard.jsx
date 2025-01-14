import React from "react";

export default function AllReviewsCard() {
  return (
    <div className="flex-1 min-w-[300px] max-w-[500px] bg-white p-4 rounded-lg ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            className="w-12 h-12 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBgCPQmyPHrOWxnUvbmQIRwOipjW8woZUreA&s"
            alt=""
          />
          <div>
            <h2 className="text-xl font-semibold">Name</h2>
            <p className="text-sm font-medium">10/15/2024</p>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <h2 className="text-xl font-semibold">unidersity name</h2>
          <p className="text-sm font-medium">Rating</p>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-sm bg-blue-100 px-4 py-1 border-2 border-blue-800 w-fit rounded-2xl">
          category
        </p>
        <p className="p-3 text-lg mt-2">
          comment : Lorem, ipsum dolor sit amet consectetur adipisicing elit. In
          praesentium magni at perferendis nam, rem voluptatibus amet inventore
          iure. Assumenda?
        </p>
      </div>
      <button className="text-lg w-full border-2 border-blue-700 px-4 py-1 rounded-lg mt-5 hover:bg-red-200 hover:border-red-600 active:scale-95">
        Delete Review
      </button>
    </div>
  );
}
