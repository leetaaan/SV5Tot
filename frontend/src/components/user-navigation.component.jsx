import { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";
const UserNavigationPanel = () => {
  const {
    userAuth: { username, role },
    setUserAuth,
  } = useContext(UserContext);

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });
  };
  return (
    <AnimationWrapper
      className="absolute right-0 z-50"
      transition={{ duration: 0.2 }}
    >
      <div className="absolute bg-white right-0 border border-grey w-60 overflow-hidden duration-200">
        {role === "Quản trị viên" ? (
          <Link to="/admin" className="flex gap-2 link pl-8 py-4">
            <i className="fi fi-rr-dashboard"></i>
            <p>Đến trang quản trị</p>
          </Link>
        ) : null}
        {role != "Sinh viên" ? (
          <Link to="/editor" className="flex gap-2 link pl-8 py-4 lg:hidden">
            <i className="fi fi-rr-file-edit"></i>
            <p>Tạo bài viết</p>
          </Link>
        ) : null}
        <Link to={`/user/${username}`} className="link pl-8 py-4">
          Hồ sơ
        </Link>
        <Link to="/settings/edit-profile" className="link pl-8 py-4">
          Cài đặt
        </Link>
        <span className="absolute border-t border-grey w-[100%]"></span>
        <button
          className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
          onClick={signOutUser}
        >
          <h1 className="font-bold text-xl mg-1">Đăng xuất</h1>
          <p className="text-dark-grey">@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
