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
import InfomationTable from "./components/infomationTable/informationTable";
import Notifications from "./pages/notifications.page";
import ManageBlogs from "./pages/manage-blogs.page";
import CommunityStandards from "./pages/community-standards-page";
import ForgotPasswordForm from "./pages/forgot-password.page";
import ResetPasswordForm from "./pages/reset-password.page";
import UsersTable from "./components/userTable/usersTable";
import StudentTable from "./components/studentTable/studentTable";
import DashBoard from "./components/dashboard/dashboard";
import BlogTable from "./components/blogTable/blogTable"

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
            <Route path="blogs" element={<ManageBlogs />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
          <Route path="settings" element={<SideNav />}>
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
          <Route path="/signup" element={<UserAuthForm type="sign-up" />} />
          <Route path="search/:query" element={<SearchPage />} />
          <Route path="user/:id" element={<ProfilePage />} />
          <Route path="blog/:blog_id" element={<BlogPage />} />
          <Route path="community-standards" element={<CommunityStandards />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="/admin" element={<Admin/>}/>

        <Route
          path="/admin/dashboards"
          element={
            <Admin>
              <DashBoard/>
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
          path="/admin/criterias"
          element={
            <Admin>
              <InfomationTable />
            </Admin>
          }
        />

<Route
          path="/admin/blogs"
          element={
            <Admin>
              <BlogTable/>
            </Admin>
          }
        />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
