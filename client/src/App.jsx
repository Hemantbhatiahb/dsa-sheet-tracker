import { useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Topics from "./pages/Topics";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "topics",
        element: <Topics />,
      },
      {
        path: "progress",
        element: <Progress />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
