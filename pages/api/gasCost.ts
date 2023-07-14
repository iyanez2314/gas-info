import { NextApiRequest, NextApiResponse } from "next";

export interface Vehicle {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { carMake, carModel, city } = req.body;
    const cylinders = await getCylinders(carMake, carModel);
    console.log(cylinders[0].cylinders);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

async function getCylinders(carMake: string, carModel: string) {
  const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=${carModel}&make=${carMake}&year=2019`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.CARS_API_KEY || "",
      "X-RapidAPI-Host": process.env.CARS_HOST || "",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
  }
}
