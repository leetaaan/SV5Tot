import React, { useContext, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import { Toaster, toast } from "react-hot-toast";
import { UserContext } from "../App";
import { EditorEventContext } from "../pages/editor.sv5tot.page";
import axios from "axios";
import { uploadToCloudinary } from "../common/cloundinary";

const EventEditor = () => {
  let {
    event,
    event: {
      title,
      tcc,
      ddtbb,
      ddt1,
      ddt2,
      ddt3,
      ddt4,
      httbb,
      htt1,
      htt2,
      htt3,
      htt4,
      htt5,
      tlt1,
      tlt2,
      tnt1,
      tnt2,
      hntbb,
      hnt1,
      hnt2,
      hnt3,
    },
    setEvent,
  } = useContext(EditorEventContext);

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  let navigate = useNavigate();

  const handleBannerUpload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url = await uploadToCloudinary(filename);
        setEvent({ ...event, tcc: url });
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDDTBBUpload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url1 = await uploadToCloudinary(filename);
        setEvent({ ...event, ddtbb: url1, tcc: event.tcc});
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleHTTBBUpload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url = await uploadToCloudinary(filename);
        setEvent({ ...event, httbb: url });
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleHNTBBUpload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url = await uploadToCloudinary(filename);
        setEvent({ ...event, hntbb: url });
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDDT1Upload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url = await uploadToCloudinary(filename);
        setEvent({ ...event, ddt1: url });
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDDT2Upload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url = await uploadToCloudinary(filename);
        setEvent({ ...event, ddt2: url });
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDDT3Upload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url = await uploadToCloudinary(filename);
        setEvent({ ...event, ddt3: url });
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleDDT4Upload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url = await uploadToCloudinary(filename);
        setEvent({ ...event, ddt4: url });
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleHTT1Upload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url = await uploadToCloudinary(filename);
        setEvent({ ...event, htt1: url });
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleHTT2Upload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url = await uploadToCloudinary(filename);
        setEvent({ ...event, htt2: url });
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleHTT3Upload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url = await uploadToCloudinary(filename);
        setEvent({ ...event, htt3: url });
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleHTT4Upload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url = await uploadToCloudinary(filename);
        setEvent({ ...event, htt4: url });
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleHTT5Upload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url = await uploadToCloudinary(filename);
        setEvent({ ...event, htt5: url });
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleTLT1Upload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url = await uploadToCloudinary(filename);
        setEvent({ ...event, tlt1: url });
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTLT2Upload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url = await uploadToCloudinary(filename);
        setEvent({ ...event, tlt2: url });
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTNT1Upload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url = await uploadToCloudinary(filename);
        setEvent({ ...event, tnt1: url });
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTNT2Upload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url = await uploadToCloudinary(filename);
        setEvent({ ...event, tnt2: url });
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleHNT1Upload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url = await uploadToCloudinary(filename);
        setEvent({ ...event, hnt1: url });
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleHNT2Upload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url = await uploadToCloudinary(filename);
        setEvent({ ...event, hnt2: url });
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleHNT3Upload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        let loadingToast = toast.loading("Đang tải ảnh...");
        const filename = reader.result;
        const url = await uploadToCloudinary(filename);
        setEvent({ ...event, hnt3: url });
        toast.dismiss(loadingToast);
        toast.success("Đã tải ảnh");
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    console.log(event);
    setEvent({ ...event, title: input.value });
  };

  const handlePushlish = (e) => {
    if (!title.length) {
      return toast.error("Vui lòng thêm tiêu đề để gửi");
    }
    if (!tcc.length) {
      return toast.error("Vui lòng thêm tiêu chuẩn chung");
    }
    if (!ddtbb.length) {
      return toast.error("Vui lòng thêm minh chứng bắt buộc cho Đạo đức tốt");
    }
    if (!httbb.length) {
      return toast.error("Vui lòng thêm minh chứng bắt buộc cho Học tập tốt");
    }
    if (!hntbb.length) {
      return toast.error("Vui lòng thêm minh chứng bắt buộc cho Hội nhập tốt");
    }
    let loadingToat = toast.loading("Đang đăng....");
    e.target.classList.add("disable");
    let eventObj = {
      title,
      tcc,
      ddtbb,
      ddt1,
      ddt2,
      ddt3,
      ddt4,
      httbb,
      htt1,
      htt2,
      htt3,
      htt4,
      htt5,
      tlt1,
      tlt2,
      tnt1,
      tnt2,
      hntbb,
      hnt1,
      hnt2,
      hnt3,
    };
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/create-event", eventObj, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(() => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToat);
        toast.success("Đã đăng");
        navigate("/");
        window.scrollTo({top: 0, behavior:"smooth"})
      })
      .catch(({ response }) => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToat);

        return toast.error(response.data.error);
      });
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {title.length ? title : `Tham gia "Sinh viên 5 tốt"`}
        </p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2" onClick={handlePushlish}>
            Gửi
          </button>
        </div>
      </nav>

      <AnimationWrapper>
        <Toaster />
        <section>
          <div className="mx-auto max-w-[1000px] w-full">
            <textarea
              defaultValue={title}
              placeholder="Tiêu đề (MSSV-Lop-HoTen)"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            ></textarea>
            <hr className="w-full opacity-10 my-5" />

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    TT
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3">
                    Nội dung tiêu chuẩn
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Yêu cầu minh chứng
                  </th>
                  <th scope="col" className="px-6 py-3 w-20">
                    Gửi minh chứng
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4">Tiêu chuẩn chung</td>
                  <td className="px-6 py-4">
                    Đạt danh hiệu “Sinh viên 5 tốt” cấp trường (đối với các LCH
                    khoa trực thuộc phải đạt danh hiệu “Sinh viên 5 tốt” cấp
                    khoa).
                  </td>
                  <td className="px-6 py-4">
                    Bản photo giấy chứng nhận đạt danh hiệu, Khen thưởng
                  </td>
                  <td className="px-6 py-4 w-[30%]">
                    <label htmlFor="uploadBanner">
                      {tcc == "" || tcc == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={tcc} className="z-20" />
                      )}
                      <input
                        id="uploadBanner"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleBannerUpload}
                      />
                    </label>
                  </td>
                </tr>

                {/* Dao duc tot */}
                <tr>
                  <td rowSpan="7" className="px-6 py-4">
                    1
                  </td>
                  <td rowSpan="7" className="px-6 py-4">
                    Tiêu chuẩn Đạo đức tốt
                  </td>
                  <td colSpan="3" className="px-6 py-4">
                    Tiêu chuẩn bắt buộc:
                  </td>
                </tr>

                <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    Điểm rèn luyện năm học 2022 – 2023: 70/100
                  </td>
                  <td className="px-6 py-4">
                    Bảng điểm đánh giá kết quả rèn luyện năm học 2022 – 2023
                  </td>
                  <td className="px-6 py-4">
                    <label htmlFor="uploadDDTBB">
                      {ddtbb == "" || ddtbb == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={ddtbb} className="z-20" />
                      )}
                      <input
                        id="uploadDDTBB"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleDDTBBUpload}
                      />
                    </label>
                  </td>
                </tr>

                <tr>
                  <td colSpan="3" className="px-6 py-4">
                    Điểm cộng: (Nếu có)
                  </td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    Là thành viên chính thức đội thi tìm hiểu về chủ nghĩa Mác –
                    Lênin, tư tưởng Hồ Chí Minh từ cấp trường trở lên.
                  </td>
                  <td className="px-6 py-4">
                    Văn bản xác nhận hoặc giấy chứng nhận của Hội Sinh viên
                    (Đoàn thanh niên trường) hoặc của cấp tham gia thành viên
                    đội tuyển
                  </td>
                  <td className="px-6 py-4">
                    <label htmlFor="uploadDDT1">
                      {ddt1 == "" || ddt1 == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={ddt1} className="z-20" />
                      )}
                      <input
                        id="uploadDDT1"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleDDT1Upload}
                      />
                    </label>
                  </td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    Là thanh niên tiên tiến gương người việc có hành động dũng
                    cảm cứu người được ghi biểu dương
                  </td>
                  <td className="px-6 py-4">
                    Xác nhận của Hội Sinh viên (Đoàn Thanh niên tường) hoặc bản
                    photo giấy chứng nhận, khen thưởng
                  </td>
                  <td className="px-6 py-4">
                    <label htmlFor="uploadDDT2">
                      {ddt2 == "" || ddt2 == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={ddt2} className="z-20" />
                      )}
                      <input
                        id="uploadDDT2"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleDDT2Upload}
                      />
                    </label>
                  </td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    Tham gia và đạt giải từ giải Ba cấp tỉnh trở lên trong các
                    cuộc thi tìm hiểu về truyền thống do Đoàn thanh niên - Hội
                    sinh viên tổ chức.
                  </td>
                  <td className="px-6 py-4">
                    Bản photo Giấy khen hoặc giấy chứng nhận
                  </td>
                  <td className="px-6 py-4">
                    <label htmlFor="uploadDDT3">
                      {ddt3 == "" || ddt3 == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={ddt3} className="z-20" />
                      )}
                      <input
                        id="uploadDDT3"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleDDT3Upload}
                      />
                    </label>
                  </td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    Là thanh niên tiêu biểu được khen thưởng trên các lĩnh vực
                    tại địa đơn vị hoặc được nêu gương trên các phương tiện
                    truyền thông đại chúng trung ương và địa phương.
                  </td>
                  <td className="px-6 py-4">
                    Giấy khen hoặc bài viết trên các trang truyền thông địa
                    phương
                  </td>
                  <td className="px-6 py-4">
                    <label htmlFor="uploadDDT4">
                      {ddt4 == "" || ddt4 == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={ddt4} className="z-20" />
                      )}
                      <input
                        id="uploadDDT4"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleDDT4Upload}
                      />
                    </label>
                  </td>
                </tr>

                {/* Hoc tap tot */}
                <tr>
                  <td rowSpan="8" className="px-6 py-4">
                    2
                  </td>
                  <td rowSpan="8" className="px-6 py-4">
                    Tiêu chuẩn Học tập tốt
                  </td>
                  <td colSpan="3" className="px-6 py-4">
                    Tiêu chuẩn bắt buộc:
                  </td>
                </tr>
                <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    Điểm trung bình chung học tập cả năm học 2022 – 2023:
                    2.3/4.0
                  </td>
                  <td className="px-6 py-4">
                    Bảng điểm trung bình chung học tập năm học 2022 – 2023
                  </td>
                  <td className="px-6 py-4">
                    <label htmlFor="uploadHTTBB">
                      {httbb == "" || httbb == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={httbb} className="z-20" />
                      )}
                      <input
                        id="uploadHTTBB"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleHTTBBUpload}
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className="px-6 py-4">
                    Điểm cộng: (Nếu có)
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    Có đề tài nghiên cứu khoa học sinh viên đạt giải cấp trường
                    trở lên
                  </td>
                  <td className="px-6 py-4">
                    Bản photo giấy chứng nhận hoặc khen thưởng
                  </td>
                  <td className="px-6 py-4">
                    <label htmlFor="uploadHTT1">
                      {htt1 == "" || htt1 == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={htt1} className="z-20" />
                      )}
                      <input
                        id="uploadHTT1"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleHTT1Upload}
                      />
                    </label>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    Có bài tham luận tham gia các hội thảo khoa học từ cấp
                    trường trở lên
                  </td>
                  <td className="px-6 py-4">
                    Bản photo bài tham luận, giấy xác nhận của Hội Sinh viên
                    (Đoàn thanh niên trường) hoặc cấp tổ chức hội thảo khoa học.
                  </td>
                  <td className="px-6 py-4">
                    <label htmlFor="uploadHTT2">
                      {htt2 == "" || htt2 == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={htt2} className="z-20" />
                      )}
                      <input
                        id="uploadHTT2"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleHTT2Upload}
                      />
                    </label>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    Có sản phẩm sáng tạo được cấp bằng sáng chế, cấp giấy phép
                    xuất bản hoặc được các giải thưởng từ cấp tỉnh trở lên.
                  </td>
                  <td className="px-6 py-4">
                    Bản photo bằng sáng chế, hoặc giấy phép, hoặc giải thưởng
                  </td>
                  <td className="px-6 py-4">
                    <label htmlFor="uploadHTT3">
                      {htt3 == "" || htt3 == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={htt3} className="z-20" />
                      )}
                      <input
                        id="uploadHTT3"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleHTT3Upload}
                      />
                    </label>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    Là thành viên các đội tuyển tham gia các kỳ thi học thuật
                    cấp quốc gia, quốc tế.
                  </td>
                  <td className="px-6 py-4">
                    Xác nhận của cấp thành lập đội tuyển hoặc của Hội Sinh viên
                    (Đoàn Thanh niên trường), bản photo khen thưởng (nếu có)
                  </td>
                  <td className="px-6 py-4">
                    <label htmlFor="uploadHTT4">
                      {htt4 == "" || htt4 == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={htt4} className="z-20" />
                      )}
                      <input
                        id="uploadHTT4"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleHTT4Upload}
                      />
                    </label>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    Đạt giải thưởng trong các cuộc thi ý tưởng sáng tạo từ cấp
                    tỉnh trở lên.
                  </td>
                  <td className="px-6 py-4">
                    Bản photo chứng nhận giải thưởng
                  </td>
                  <td className="px-6 py-4">
                    <label htmlFor="uploadHTT5">
                      {htt5 == "" || htt5 == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={htt5} className="z-20" />
                      )}
                      <input
                        id="uploadHTT5"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleHTT5Upload}
                      />
                    </label>
                  </td>
                </tr>

                {/* The luc tot */}
                <tr>
                  <td rowSpan="3" className="px-6 py-4">
                    3
                  </td>
                  <td rowSpan="3" className="px-6 py-4">
                    Tiêu chuẩn Thể lực tốt
                  </td>
                  <td colSpan="3" className="px-6 py-4">
                    Đạt 1 trong hai tiêu chuẩn sau:
                  </td>
                </tr>

                <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">Đạt danh hiệu “Sinh viên khỏe”</td>
                  <td className="px-6 py-4">
                    Bản photo giấy chứng nhận hoặc hình ảnh
                  </td>
                  <td className="px-6 py-4">
                    <label htmlFor="uploadTLT1">
                      {tlt1 == "" || tlt1 == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={tlt1} className="z-20" />
                      )}
                      <input
                        id="uploadTLT1"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleTLT1Upload}
                      />
                    </label>
                  </td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    Tham gia và đạt giải tại các hoạt động thể thao phong trào
                    từ cấp khoa trở lên.
                  </td>
                  <td className="px-6 py-4">
                    Bản photo giấy chứng nhận hoặc khen thưởng hoặc hình ảnh
                    tham gia
                  </td>
                  <td className="px-6 py-4">
                    <label htmlFor="uploadTLT2">
                      {tlt2 == "" || tlt2 == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={tlt2} className="z-20" />
                      )}
                      <input
                        id="uploadTLT2"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleTLT2Upload}
                      />
                    </label>
                  </td>
                </tr>

                {/* Tinh nguyen tot */}
                <tr>
                  <td rowSpan="3" className="px-6 py-4">
                    4
                  </td>
                  <td rowSpan="3" className="px-6 py-4">
                    Tiêu chuẩn Tình nguyện tốt
                  </td>
                </tr>

                <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    Tham gia các hoạt động tình nguyện từ cấp khoa trở lên
                  </td>
                  <td className="px-6 py-4">
                    Giấy chứng nhận và hình ảnh minh chứng
                  </td>
                  <td className="px-6 py-4">
                    <label htmlFor="uploadTNT1">
                      {tnt1 == "" || tnt1 == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={tnt1} className="z-20" />
                      )}
                      <input
                        id="uploadTNT1"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleTNT1Upload}
                      />
                    </label>
                  </td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    Được khen thưởng từ cấp trường trở lên về hoạt động tình
                    nguyện.
                  </td>
                  <td className="px-6 py-4">Bản photo khen thưởng</td>
                  <td className="px-6 py-4">
                    <label htmlFor="uploadTNT2">
                      {tnt2 == "" || tnt2 == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={tnt2} className="z-20" />
                      )}
                      <input
                        id="uploadTNT2"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleTNT2Upload}
                      />
                    </label>
                  </td>
                </tr>

                {/* Hoi nhap tot */}
                <tr>
                  <td rowSpan="7" className="px-6 py-4">
                    5
                  </td>
                  <td rowSpan="7" className="px-6 py-4">
                    Tiêu chuẩn Hội nhập tốt
                  </td>
                  <td colSpan="3" className="px-6 py-4">
                    Tiêu chuẩn bắt buộc:
                  </td>
                </tr>

                <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    Tham gia và đạt giải tại các cuộc thi Olympic ngoại ngữ,
                    hùng biện từ cấp khoa trở lên hoặc Đạt từ điểm 6,5 trở lên
                    (tính theo thang điểm 10) đối với 01 môn thi Ngoại ngữ gần
                    nhất theo chương trình học của trường hoặc có chứng chỉ
                    ngoại ngữ (B1, TOEIC,...)đảm bảo tốt nghiệp đầu ra theo quy
                    định của Nhà trường. Đối tượng sinh viên chuyên nghành Ngoại
                    ngữ: Chứng chỉ ngoại ngữ được áp dụng với chuyên ngành ngoại
                    ngữ theo quy định của trường; hoặc
                  </td>
                  <td className="px-6 py-4">
                    Bản photo Bảng điểm môn thi gần nhất hoặc chứng chỉ ngoại
                    ngữ Hoặc photo hình ảnh tham gia các Hội thảo, chương trình
                    có sử dụng ngoại ngữ Hoặc chứng nhận tham gia CLB Ngoại ngữ
                  </td>
                  <td className="px-6 py-4">
                    <label htmlFor="uploadHNTBB">
                      {hntbb == "" || hntbb == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={hntbb} className="z-20" />
                      )}
                      <input
                        id="uploadHNTBB"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleHNTBBUpload}
                      />
                    </label>
                  </td>
                </tr>

                <tr>
                  <td colSpan="3" className="px-6 py-4">
                    Điểm cộng: (Nếu có)
                  </td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    Hoàn thành ít nhất 01 khóa trang bị kỹ năng thực hành xã hội
                    hoặc được Hội Sinh viên, Đoàn Thanh niên từ cấp khoa trở lên
                    khen thưởng về thành tích xuất sắc trong công tác Hội và
                    phong trào sinh viên, công tác Đoàn và phong trào thanh niên
                    trường học trong năm học.
                  </td>
                  <td className="px-6 py-4">
                    Bản photo giấy chứng nhận hoặc giấy khen
                  </td>
                  <td className="px-6 py-4">
                    <label htmlFor="uploadHNT1">
                      {hnt1 == "" || hnt1 == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={hnt1} className="z-20" />
                      )}
                      <input
                        id="uploadHNT1"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleHNT1Upload}
                      />
                    </label>
                  </td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    Tham gia ít nhất 01 hoạt động giao lưu quốc tế: Hội nghị,
                    Hội thảo quốc tế, các chương trình gặp gỡ, giao lưu, hợp tác
                    với thanh niên, sinh viên quốc tế trong và ngoài nước.
                  </td>
                  <td className="px-6 py-4">
                    Xác nhận của Liên chi Đoàn Khoa hoặc bản photo các chứng
                    nhận, xác nhận khác có liên quan
                  </td>
                  <td className="px-6 py-4">
                    <label htmlFor="uploadHNT2">
                      {hnt2 == "" || hnt2 == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={hnt2} className="z-20" />
                      )}
                      <input
                        id="uploadHNT2"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleHNT2Upload}
                      />
                    </label>
                  </td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    Tham gia và đạt giải từ giải Ba cấp tỉnh trở lên trong các
                    cuộc thi tìm hiểu về truyền thống do Đoàn thanh niên - Hội
                    sinh viên tổ chức.
                  </td>
                  <td className="px-6 py-4">
                    Bản photo giấy chứng nhận hoặc khen thưởng
                  </td>
                  <td className="px-6 py-4">
                    <label htmlFor="uploadHNT3">
                      {hnt3 == "" || hnt3 == null ? (
                        <img src={defaultBanner} className="z-20 text-2xl" />
                      ) : (
                        <img src={hnt3} className="z-20" />
                      )}
                      <input
                        id="uploadHNT3"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleHNT3Upload}
                      />
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default EventEditor;
