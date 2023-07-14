"use client";
import { useState } from "react";
import CarCard from "../components/CarCard";
import Form from "../components/Form";

export interface State {
  carMake: string;
  carModel: string;
  city: string;
}

export default function Home() {
  const [formData, setFormData] = useState<State>({
    carMake: "",
    carModel: "",
    city: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // Here I will submit this information to the backend
    const response = await fetch("/api/gasCost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(formData);
  };
  return (
    <main className="flex min-h-screen items-center justify-evenly md:flex-row flex-col  p-24">
      <Form handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
      <CarCard />
    </main>
  );
}
