import "./index.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { initializeLoginUser } from "./reducers/user";
import { initializeBlogs } from "./reducers/blog";
import LoginForm from "./components/Forms/Login";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import BlogDetail from "./components/BlogDetail";
import NavBar from "./components/NavBar";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeLoginUser());
  }, []);

  if (!user) {
    return (
      <div className="min-w-screen min-h-screen flex flex-col items-center">
        <h2 className="text-3xl mb-8 mt-52">Log in to application</h2>
        <div className="w-10/12 sm:w-1/2 lg:w-4/12 mb-5">
          <Notification />
        </div>
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="flex flex-col p-10">
        <h2 className="text-3xl capitalize m-auto mb-5">blog app</h2>
        <div className="mb-5">
          <Notification />
        </div>

        <Routes>
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/" element={<BlogList />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
