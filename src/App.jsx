import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Authentication/Login/Login";
import Navbar from "./pages/Components/Navbar";
import Dashboard from "./pages/Accounts/Admin/Dashboard/Dashboard";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/admin/dashboard",
      element: (
        <>
          <Navbar />
          <Dashboard/>
        </>
      ),
    },
    {
      path: "/student/dashboard",
      element: (
        <>
          <Navbar />
        </>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
