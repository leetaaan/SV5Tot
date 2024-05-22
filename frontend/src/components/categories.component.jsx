import React, { useContext, useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { EditorContext } from "../pages/editor.pages";

export const categoryy = [
  { name: "Hoạt động cấp trường" },
  { name: "Khoa Toán – Tin học" },
  { name: "Khoa Công nghệ Thông tin" },
  { name: "Khoa Vật lý và Kỹ thuật hạt nhân" },
  { name: "Khoa Hóa học và Môi trường" },
  { name: "Khoa Sinh học" },
  { name: "Khoa Nông lâm" },
  { name: "Khoa Ngữ văn và Lịch sử" },
  { name: "Khoa Kinh tế – Quản trị Kinh doanh" },
  { name: "Khoa Tài chính - Kế toán" },
  { name: "Khoa Du lịch" },
  { name: "Khoa Luật học" },
  { name: "Khoa Ngoại ngữ" },
  { name: "Khoa Quốc tế học" },
  { name: "Khoa Xã hội học và Công tác xã hội" },
  { name: "Khoa Sư phạm" },
  { name: "Đạo đức tốt" },
  { name: "Học tập tốt" },
  { name: "Thể lực tốt" },
  { name: "Tình nguyện tốt" },
  { name: "Hội nhập tốt" },
  { name: "Mỗi ngày một tin tốt - Mỗi tuần một câu chuyện đẹp" },
  { name: "Bài học Lý luận chính trị" },
  { name: "Học tập Nghị quyết" },
  { name: "Tuyên truyền chính sách, pháp luật" },
  { name: "Hỗ trợ sinh viên" },
  { name: "Nhịp sống giảng đường" },
  { name: "Sinh viên tình nguyện" },
  { name: "Văn bản - Biểu mẫu" },
];
const Categories = ({ selected, setSelected }) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  let {
    blog,
    blog: { categories },
    setBlog
  } = useContext(EditorContext);

  return (
    <div className="w-[100%] font-medium">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 flex items-center justify-between rounded ${
          !selected && "text-gray-700"
        }`}
      >
        {selected
          ? selected.length > 25
            ? selected.substring(0, 25) + "..."
            : selected
          : "Chọn chủ đề"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Tìm kiếm chủ đề"
            className="placeholder:text-gray-700 p-2 outline-none"
          />
        </div>
        {categoryy?.map((category) => (
          <li
            key={category.name}
            className={`p-2 text-sm hover:bg-twitter hover:text-white
            ${
              category.name?.toLowerCase() === selected?.toLowerCase() &&
              "hover:bg-twitte text-white"
            }
            ${
              category.name.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (category.name.toLowerCase() !== selected.toLowerCase()) {
                setSelected(category.name)
                setBlog({...blog, categories})
                setOpen(false);
                setInputValue("");
              }
              
            }}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
