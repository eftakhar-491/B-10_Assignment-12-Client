import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import bg from "../../assets/images/bg.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import h1 from "../../assets/images/h1.png";
import h2 from "../../assets/images/h2.png";
import h3 from "../../assets/images/h3.png";
// import "./styles.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
export default function Hero() {
  return (
    <>
      <header>
        <div
          style={{
            backgroundImage: `linear-gradient(
    to bottom,
    rgba(0,0,0,.60),
    rgba(0,0,0,.60)
  ),url(${bg})`,
          }}
          className="max-w-[1900px] mx-auto bg-slate-500 bg-cover bg-center rounded-lg"
        >
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper text-white"
          >
            <SwiperSlide>
              <div className="h-[600px] flex items-center justify-between px-[5%]">
                <div className="w-1/2">
                  <h1 className="text-5xl font-bold mb-3">
                    Your Gateway to Educational Opportunities
                  </h1>
                  <p className="text-lg">
                    Simplify the process of managing and applying for
                    scholarships with our innovative platform. Helping students
                    and administrators achieve success seamlessly.
                  </p>
                  <button className="text-lg border-2 border-blue-700 px-4 py-1 rounded-lg mt-5 hover:bg-blue-950 active:scale-95">
                    See All Scholarship
                  </button>
                </div>
                <div className="w-1/2">
                  <img className="mx-auto" src={h2} alt="" />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="h-[600px] flex items-center justify-between px-[5%]">
                <div className="w-1/2">
                  <h1 className="text-5xl font-bold mb-3">
                    Empowering Dreams, One Scholarship at a Time
                  </h1>
                  <p className="text-lg">
                    Simplify the process of managing and applying for
                    scholarships with our innovative platform. Helping students
                    and administrators achieve success seamlessly
                  </p>
                  <button className="text-lg border-2 border-blue-700 px-4 py-1 rounded-lg mt-5 hover:bg-blue-950 active:scale-95">
                    See All Scholarship
                  </button>
                </div>
                <div className="w-1/2">
                  <img className="mx-auto" src={h3} alt="" />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="h-[600px] flex items-center justify-between px-[5%]">
                <div className="w-1/2">
                  <h1 className="text-5xl font-bold mb-3">
                    Your Gateway to Scholarship Success
                  </h1>
                  <p className="text-lg">
                    Empowering you to focus on what matters most—achieving
                    academic excellence.
                  </p>
                  <button className="text-lg border-2 border-blue-700 px-4 py-1 rounded-lg mt-5 hover:bg-blue-950 active:scale-95">
                    See All Scholarship
                  </button>
                </div>
                <div className="w-1/2">
                  <img className="mx-auto" src={h1} alt="" />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </header>
    </>
  );
}
