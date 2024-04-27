import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import UserNavigationPanel from "./user-navigation.component";

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const [userPanel, setUserPanel] = useState(false);
  // const {
  //   userAuth,
  //   userAuth: { access_token, profile_img },
  // } = useContext(UserContext);

  let {
    userAuth,
    userAuth: { access_token, username, fullname, clas, profile_img, role },
  } = useContext(UserContext);

  let navigate = useNavigate();
  const handleUserNavPanel = () => {
    setUserPanel((currentVal) => !currentVal);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setUserPanel(false);
    }, 200);
  };
  const handleSearch = (e) => {
    let query = e.target.value;
    if (e.keyCode === 13 && query.length) {
      navigate(`/search/${query}`);
    }
  };

  console.log(username);
  console.log(userAuth);

  return (
    <>
      <nav className="navbar z-50">
        <Link to="/" className="flex-none w-10">
          <img src={logo} className="w-full" />
        </Link>
        <div
          className={
            "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " +
            (searchBoxVisibility ? "show" : "hidden")
          }
        >
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%]
            md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
            onKeyDown={handleSearch}
          />
          <i
            className="fi fi-rr-search absolute right-[10%]
        md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"
          ></i>
        </div>

        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          <button
            className="md:hidden bg-grey w-12 h-12 rounded-full
        flex items-center justify-center"
            onClick={() => setSearchBoxVisibility((currentVal) => !currentVal)}
          >
            <i className="fi fi-rr-search text-2xl"></i>
          </button>
          </div>
        {access_token ? (
          <>
          {role === "Sinh viên" ? null : (
            <Link to="/editor" className="hidden lg:flex gap-2 link">
              <i className="fi fi-rr-file-edit"></i>
              <p>Tạo bài viết"</p>
            </Link>
          )}
            <Link to="/dashboard/notification">
              <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                <i className="fi fi-rr-bell text-2xl block mt-1"></i>
              </button>
            </Link>
            <div
              className="relative"
              onClick={handleUserNavPanel}
              onBlur={handleBlur}
            >
              <button className="w-12 h-12 mt-1">
                <img
                  src={profile_img}
                  className="w-full object-cover rounded-full"
                />
              </button>
              {userPanel ? <UserNavigationPanel /> : ""}
            </div>
          </>
        ) : (
          <>
            <Link className="btn-dark py-2" to="/signin">
              Đăng nhập
            </Link>
          </>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
