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

  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
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
      <div className="flex items-center space-y-3 p-4 flex-col sm:space-x-4  sm:w-full sm:flex-col md:w-full  md:flex-col  lg:w-full lg:flex-row xl:w-3/4 xl:flex-row">
        <Form
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={loading}
        />
        {apiData.carMake === "" ? null : <CarCard carData={apiData} />}
      </div>
    </main>
  );
}
