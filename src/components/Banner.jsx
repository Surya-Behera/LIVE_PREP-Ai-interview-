import React, { useState } from "react";
import hero from "../../public/hero.png";
function Banner() {

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row mt-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl font-bold font-serif ">
              Crack the Code to Your Dream Job{" "}
              With<span className="text-orange-600"> LIVE Prep</span>
            </h1>
            <p className="text-sm md:text-lg font-serif">
              Real Questions, Real Companies, Real Success
            </p>
          </div>
        <button className="p-2 bg-cyan-600 text-white rounded-md mt-3" ><a href="/course">Get Started</a></button>
       <a href="/vcin" className="p-2 text-red-500">Go online</a>
 
       
        </div>
        <div className="order-1 w-full mt-20 md:w-1/2">
          <img
            src={hero}
            className="md:w-[550px] md:h-[350px] md:ml-12"
            alt=""
          />
        </div>
      </div>

      {/* Dialog */}
     
    </>
  );
}

export default Banner;