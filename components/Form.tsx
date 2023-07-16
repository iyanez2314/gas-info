"use client";
import React, { useState } from "react";

interface Props {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  isLoading: boolean;
}

export default function Form({
  handleInputChange,
  handleSubmit,
  isLoading,
}: Props) {
  return (
    <div className="text-white text-2xl font-light flex flex-col gap-4 p-6 md:w-full lg:w-full xl:w-full">
      <div>
        <h1 className="font-semibold">Enter your Car Information</h1>
        <p className="text-sm font-md w-full sm:w-1/2 text-ellipsis overflow-hidden">
          Don'tcha hate asking the question 'I wonder how much gas I will need
          this week'? Let us make it easy. (This is just a guess based on the
          average gas prices)
        </p>
      </div>
      <div className="flex flex-col gap-5 w-full ">
        <div className="flex flex-col">
          <label className="font-medium text-sm">Car Make</label>
          <input
            onChange={handleInputChange}
            className="border-2 text-black border-gray-300 rounded-md p-1 px-3"
            type="text"
            placeholder="Enter your vehicle make"
            name="carMake"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-sm">Car Model</label>
          <input
            onChange={handleInputChange}
            className="border-2 text-black border-gray-300 rounded-md p-1 px-3"
            type="text"
            placeholder="Enter your vehicle model"
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
          {isLoading ? (
            <span className="flex justify-center">
              <div
                className=" h-6 w-6 rounded-full animate-spin
            border border-solid border-yellow-500 border-t-transparent"
              ></div>
            </span>
          ) : (
            "Enter"
          )}
        </button>
      </div>
    </div>
  );
}
