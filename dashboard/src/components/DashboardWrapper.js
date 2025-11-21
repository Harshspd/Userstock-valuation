// frontend/src/pages/Dashboard/DashboardWrapper.js
import React from "react";
import Home from "./Home";       // Fixed layout
import Dashboard from "./Dashboard"; // Routes & dashboard logic

export default function DashboardWrapper() {
  return (
    <Home>
      <Dashboard />
    </Home>
  );
}
