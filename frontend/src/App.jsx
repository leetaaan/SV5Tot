import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor.pages";
import HomeForumPage from "./pages/home.forum.page";
import SearchPage from "./pages/search.page";
import EditorSV5Tot from "./pages/editor.sv5tot.page";
import PageNotFound from "./pages/404.page";
import ProfilePage from "./pages/profile.page";
import BlogPage from "./pages/blog.page";
import SideNav from "./components/sidenavbar.component";
import ChangePassword from "./pages/change-password.page";
import EditProfile from "./pages/edit-profile.page";
import Admin from "./pages/admin/adminLayout";
import InfomationTable from "./components/infomationTable/infimationTable";
import Notifications from "./pages/notifications.page";
import UsersTable from "./components/userTable/usersTable";
export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:blog_id" element={<Editor />} />

        <Route path="/event" element={<EditorSV5Tot />} />
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomeForumPage />} />
          <Route path="dashboard" element={<SideNav />}>
            <Route path="notifications" element={<Notifications />} />
          </Route>
          <Route path="settings" element={<SideNav />}>
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
          {/* <Route path="/signup" element={<UserAuthForm type="sign-up" />} /> */}
          <Route path="search/:query" element={<SearchPage />} />
          <Route path="user/:id" element={<ProfilePage />} />
          <Route path="blog/:blog_id" element={<BlogPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/admin/profile"
          element={
            <Admin>
              <ProfilePage />
            </Admin>
          }
        />
        <Route
          path="/admin/users"
          element={
            <Admin>
              <UsersTable />
            </Admin>
          }
        />
        <Route
          path="/admin/students"
          element={
            <Admin>
              <InfomationTable />
            </Admin>
          }
        />
        <Route
          path="/admin/students"
          element={
            <Admin>
              <InfomationTable />
            </Admin>
          }
        />
        <Route
          path="/admin/criterias"
          element={
            <Admin>
              
            </Admin>
          }
        />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
