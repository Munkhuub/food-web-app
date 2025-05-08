import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

const carousel = [
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
  "Fresh fast delivered",
];

export const Footer = () => {
  return (
    <div className="h-[700px] w-full bg-[#18181B] pt-15 pb-[53px]">
      <div className="h-[92px] bg-[#EF4444] flex items-center">
        {/* flex gap-[34px] overflow-x-auto w-full */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={34}
          slidesPerView="auto"
          loop={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          className="w-full"
        >
          {carousel.map((item, i) => (
            <SwiperSlide key={i} className="!w-auto">
              <h2 className="text-3xl font-semibold whitespace-nowrap" key={i}>
                {item}
              </h2>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div> "Fresh fast delivered"</div>
      <div></div>
    </div>
  );
};
