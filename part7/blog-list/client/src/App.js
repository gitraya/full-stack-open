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
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <h2>blog app</h2>
      <Notification />

      <Routes>
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  );
};

export default App;
