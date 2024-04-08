import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

export default function Banner() {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Autoplay, Navigation]}
      className="w-full h-96 object-cover"
    >
      <SwiperSlide>
        <img
          src="https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2024/3/4/anh-3-1709514631386425813728.jpg"
          alt=""
          
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://doanthanhnien.vn/Content/uploads/images/133548565261340185_img7435-1679457188099230985920.jpg"
          alt=""
          
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2024/3/15/107-ntm04603-17104949785511497251943.jpg"
          alt=""
          
        />
      </SwiperSlide>
    </Swiper>
  );
}