import { useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Topics from "./pages/Topics";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "topics",
        element: (
          <ProtectedRoute>
            <Topics />
          </ProtectedRoute>
        ),
      },
      {
        path: "progress",
        element: (
          <ProtectedRoute>
            <Progress />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
