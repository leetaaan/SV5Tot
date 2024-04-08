import pageNotFoundImage from "../imgs/404.png";
import logo from "../imgs/logo.png";

import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <section className="h-cover relative p-10 flex flex-col items-center gap-20 text-center">
      <img
        src={pageNotFoundImage}
        className="rounded select-none border-2 border-grey w-72 aspect-square object-cover"
      />
      <h1 className="text-4xl font-gelasio leading-7">
        Trang không được tìm thấy
      </h1>
      <p className="text-dark-grey text-xl leading-7 -mt-8">
        Trang bạn đang tìm không tồn tại. Vui lòng quay lại{" "}
        <Link to="/" className="text-black underline">
          trang chủ
        </Link>
      </p>
      <div className="mt-auto">
        <img src={logo} className="h-8 object-contain block mx-auto select-none" />
        <p className="mt-5 text-dark-grey">Sinh viên 5 tốt</p>
      </div>
    </section>
  );
};

export default PageNotFound;
