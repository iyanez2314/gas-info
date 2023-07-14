"use client";
import React, { useState } from "react";

interface Props {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

export default function Form({ handleInputChange, handleSubmit }: Props) {
  return (
    <div className="text-white text-2xl font-light flex flex-col gap-4 p-6 md:w-full lg:w-full xl:w-full">
      <div>
        <h1 className="font-semibold">Enter your Car Information</h1>
        <p className="text-sm font-md">
          Dontcha hate asking the question "I wonder how much gas I will need
          this week" Let us make it easy.
        </p>
      </div>
      <div className="flex flex-col gap-5 w-full ">
        <div className="flex flex-col">
          <label className="font-medium text-sm">Car Make</label>
          <input
            onChange={handleInputChange}
            className="border-2 text-black border-gray-300 rounded-md p-1 px-3"
            type="text"
            placeholder="Enter your car make"
            name="carMake"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-sm">Car Model</label>
          <input
            onChange={handleInputChange}
            className="border-2 text-black border-gray-300 rounded-md p-1 px-3"
            type="text"
            placeholder="Enter your car model"
            name="carModel"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-sm">Year</label>
          <input
            onChange={handleInputChange}
            className="border-2 text-black border-gray-300 rounded-md p-1 px-3"
            type="text"
            placeholder="Enter your vehicle year"
            name="year"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="uppercase bg-[#1DB954] text-white p-3 rounded text-sm  hover:opacity-75 transition-all duration-300 ease-in-out"
        >
          Enter
        </button>
      </div>
    </div>
  );
}
