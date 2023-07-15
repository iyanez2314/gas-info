import React from "react";
import Image from "next/image";
import car from "../public/2022-Hennessey-VelociRaptor-600-1.jpg";
import { GasCost } from "../app/page";

export default function CarCard({ carData }: GasCost) {
  console.log(carData);

  return (
    <div className="bg-[#363636] flex flex-col justify-center items-center p-3 rounded w-full">
      {carData.vehicle.averageCost.gallonSize === undefined ? (
        <div className="flex justify-center items-center">
          <h1>NO DATA FOUND SORRY </h1>
        </div>
      ) : (
        <>
          <div className="mt-5">
            <img
              className="rounded"
              src={carData.vehicle.vehicleImage}
              alt="car"
              width={350}
              height={350}
            />
          </div>
          <div className="flex justify-center flex-col my-6 text-white w-full">
            <div className="flex text-clip text-lg text-md justify-evenly space-x-5 font-thin mb-3">
              <div className="justify-center sm:w-1/2 flex sm:justify-center w-4/6 items-center">
                <h1 className="font-semibold text-sm sm:text-lg">
                  {carData.vehicle.carMake} {carData.vehicle.carModel}
                </h1>
              </div>
              <div className=" justify-center sm:w-1/2 flex sm:justify-center w-4/6">
                <p className="sm:text-lg text-sm">
                  Gallon Size{" "}
                  {carData.vehicle.averageCost.gallonSize || "Error Happend"}
                </p>
              </div>
            </div>
            <hr className="mx-6 sm:mx-0" />
            <div className="flex mt-3 text-lg text-md justify-evenly space-x-5 font-thin ">
              <div className=" justify-center sm:w-1/2 flex sm:justify-center w-4/6">
                <h1 className="font-semibold text-sm sm:text-lg">
                  Regular Grade:
                </h1>
              </div>
              <div className=" justify-center sm:w-1/2 flex sm:justify-center w-4/6">
                <p className="sm:text-lg text-sm">
                  ${carData.vehicle.averageCost.regularCost || "Error Happend"}
                </p>
              </div>
            </div>
            <div className="flex text-lg text-md justify-evenly space-x-5 font-thin ">
              <div className=" justify-center sm:w-1/2 flex sm:justify-center w-4/6">
                <h1 className="font-semibold text-sm sm:text-lg">
                  Medium Grade:
                </h1>
              </div>
              <div className=" justify-center sm:w-1/2 flex sm:justify-center w-4/6">
                <p className="sm:text-lg text-sm">
                  ${carData.vehicle.averageCost.midCost || "Error Happend"}
                </p>
              </div>
            </div>
            <div className="flex text-lg text-md justify-evenly space-x-5 font-thin ">
              <div className=" justify-center sm:w-1/2 flex sm:justify-center w-4/6">
                <h1 className="font-semibold text-sm sm:text-lg">
                  Premium Grade:
                </h1>
              </div>
              <div className="justify-center sm:w-1/2 flex sm:justify-center w-4/6">
                <p className="sm:text-lg text-sm">
                  ${carData.vehicle.averageCost.premiumCost || "Error Happend"}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
