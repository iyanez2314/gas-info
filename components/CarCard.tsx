import React from "react";
import Image from "next/image";
import car from "../public/2022-Hennessey-VelociRaptor-600-1.jpg";
import { GasCost } from "../app/page";

export default function CarCard({ carData }: GasCost) {
  return (
    <div className="bg-[#363636] flex flex-col justify-center items-center p-3 rounded w-full">
      <div className="mt-5">
        <img
          className="rounded"
          src={carData.vehicle.vehicleImage}
          alt="car"
          width={500}
          height={500}
        />
      </div>
      <div className="flex justify-center flex-col my-6 text-white ">
        <div className="flex text-lg text-md justify-evenly space-x-5 font-thin">
          <h1>
            {carData.vehicle.carMake} {carData.vehicle.carModel}
          </h1>
          <p>
            Gallon Size{" "}
            {carData.vehicle.averageCost.gallonSize || "Error Happend"}
          </p>
        </div>
        <div className="mt-3 bg-[#272727] mx-3 flex-col justify-between flex ">
          <div className="flex justify-evenly">
            <div className="w-4/6 justify-center sm:w-1/2 flex sm:justify-center">
              <p>Regular Grade: </p>
            </div>
            <p>${carData.vehicle.averageCost.regularCost || "Error Happend"}</p>
          </div>
          <div className=" flex justify-evenly">
            <div className="w-4/6 sm:w-1/2 flex justify-center sm:justify-center">
              <p>Mid Grade: </p>
            </div>
            <p>${carData.vehicle.averageCost.midCost || "Error Happend"}</p>
          </div>
          <div className="flex justify-evenly">
            <div className="w-4/6 sm:w-1/2 flex justify-center sm:justify-center">
              <p>Premium Grade: </p>
            </div>
            <div>
              <p>
                ${carData.vehicle.averageCost.premiumCost || "Error Happend"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
