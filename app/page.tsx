"use client";
import { useState } from "react";
import CarCard from "../components/CarCard";
import Form from "../components/Form";

export interface State {
  carMake: string;
  carModel: string;
  year: string;
}

export interface GasCost {
  averageCost: {
    gallonSize: string;
    midCost: string;
    premiumCost: string;
    regularCost: string;
  };
}

export interface CardProps extends GasCost {
  carMake: string;
  carModel: string;
  vehicleImage: string;
}

export default function Home() {
  const [formData, setFormData] = useState<State>({
    carMake: "",
    carModel: "",
    year: "",
  });

  const [apiData, setApiData] = useState<CardProps>({
    carMake: "",
    carModel: "",
    vehicleImage: "",
    averageCost: {
      gallonSize: "",
      midCost: "",
      premiumCost: "",
      regularCost: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const response = await fetch("/api/gasCost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setLoading(true);
    const data: CardProps = await response.json();
    setTimeout(() => {
      setApiData(data);
      setLoading(false);
    }, 3000);
  };

  return (
    <main className="flex min-h-screen items-center justify-evenly md:flex-row flex-col p-24">
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 p-4">
        <Form
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        {apiData.carMake === "" ? null : loading ? (
          <div
            className="w-12 h-12 rounded-full animate-spin
          border border-solid border-yellow-500 border-t-transparent"
          ></div>
        ) : (
          <CarCard carData={apiData} />
        )}
      </div>
    </main>
  );
}
