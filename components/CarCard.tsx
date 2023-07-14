import React from "react";
import Image from "next/image";
import car from "../public/2022-Hennessey-VelociRaptor-600-1.jpg";

export default function CarCard() {
  return (
    <div className="mt-5 bg-slate-500 p-3 rounded">
      <Image src={car} alt="car" width={500} height={500} />
      <div className=" my-2  text-white ">
        <div className="flex text-lg text-md justify-evenly font-thin">
          <h1>2022 Hennessey VelociRaptor</h1>
          <p>gallon img > 20</p>
        </div>
        <div className="mt-3 bg-slate-400 flex-col flex sm:mx-12  justify-between">
            <div className="flex justify-evenly">
            <p>Low Grade: </p>
            <p>$45.00</p>
            </div>
            <div className="flex justify-evenly">
            <p>Low Grade: </p>
            <p>$45.00</p>
            </div>
            <div className="flex justify-evenly">
            <p>Low Grade: </p>
            <p>$45.00</p>
            </div>
        </div>
      </div>
    </div>
  );
}
