import React from "react";
import Login from "./Login";
import ExpenseList from "./ExpenseList";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Header from "./Header";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "list",
      element: <ExpenseList />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  );
};

export default Body;
