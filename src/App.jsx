import React from "react";
import { Route, Routes } from "react-router-dom";
import Course from "./Course/course";
import { Toaster } from "react-hot-toast";
import Home from "./Home/home";
function App() {
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={<Course/>} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
