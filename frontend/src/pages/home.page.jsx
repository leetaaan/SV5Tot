import React from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import Banner from "../components/banner.component";
import Intro from '../imgs/Intro.png'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';


// import required modules
import { EffectCards } from 'swiper/modules';
const HomePage = () => {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-14">
          <img src={logo} />
        </Link>
        <div className="flex gap-4 ml-auto">
          <Link className="btn-dark py-2" to="/sv5toteditor">
            Tham gia sinh viên 5 tốt
          </Link>
          <Link className="btn-light py-2 hidden md:block" to="/homeforum">
            Diễn đàn
          </Link>
        </div>
      </nav>
      <Banner />
      <div className="bg-gray-100 p-8 m-8">
        <h1 className="font-medium text-3xl">Sinh viên 5 tốt là gì </h1>
        <div className="flex gap-10 items-center justify-center">
          <img className="w-1/5 h-1/5" src={Intro} alt="" />
          <div className="grid grid-cols-3 gap-16">
            <div className="bg-white shadow-md border p-4">
            <h4>Học tập tốt:</h4>
            <p className="text-xl text-gray-800 mt-2">Có kết quả học tập xuất sắc, luôn hoàn thành tốt nhiệm vụ học tập và đạt thành tích cao trong các kỳ thi.</p>
            </div>
            <div className="bg-white shadow-md border p-4">
            <h4>Tình nguyện tốt:</h4>
            <p>Tham gia tích cực các hoạt động tình nguyện, giúp đỡ cộng đồng; có tinh thần tương thân tương ái, đoàn kết, giúp đỡ bạn bè.</p>
            </div>
            <div className="bg-white shadow-md border p-4">
            <h4>Đạo đức tốt:</h4>
            <p>Có phẩm chất đạo đức tốt, lối sống lành mạnh, biết giữ gìn và phát huy truyền thống tốt đẹp của dân tộc.</p>
            </div>
            <div className="bg-white shadow-md border p-4">
            <h4>Thể lực tốt:</h4>
            <p>Có sức khỏe tốt, thường xuyên tham gia rèn luyện thể dục thể thao và có ý thức giữ gìn vệ sinh môi trường.</p>
            </div>
            <div className="bg-white shadow-md border p-4">
            <h4>Hội nhập tốt:</h4>
            <p>Có khả năng thích ứng với môi trường mới, biết tiếp thu tinh hoa văn hóa của các nước khác và giữ gìn bản sắc văn hóa dân tộc.</p>
            </div>
          </div>
          
        </div>
      </div>
      <div className="infographic">
      <h1 className="font-medium text-3xl">Tiêu chí xét duyệt sinh viên 5 tốt</h1>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="infographic"
      >
        <SwiperSlide>
          <img src="https://doanthanhnien.duytan.edu.vn/uploads/images/bai-viet/1.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://doanthanhnien.duytan.edu.vn/uploads/images/bai-viet/2.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://doanthanhnien.duytan.edu.vn/uploads/images/bai-viet/3.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://doanthanhnien.duytan.edu.vn/uploads/images/bai-viet/4.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://doanthanhnien.duytan.edu.vn/uploads/images/bai-viet/5.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
      </div>
    </>
  );
};

export default HomePage;
