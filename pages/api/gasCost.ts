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
    try {
      const { carMake, carModel, year } = req.body;
      const cylinders = await getCylinders(carMake, carModel);
      const averageCost = await calculateGasAverage(cylinders, year);
      const vehicleImage = await getVehicleImage(carMake, carModel, year);
      const vehicle = {
        carMake,
        carModel,
        vehicleImage,
        cylinders,
        averageCost,
      };
      res.status(200).json({ vehicle });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

async function calculateGasAverage(cylinders: number, city: string) {
  //   const gasPrices = await getGasPrice(city);
  //   console.log(gasPrices);
  const gallonSize = reuturnGallonSize(cylinders);

  let minGallons, maxGallons;

  if (cylinders === 4) {
    minGallons = 10;
    maxGallons = 12;
  } else if (cylinders === 6) {
    minGallons = 15;
    maxGallons = 17;
  } else if (cylinders === 8) {
    minGallons = 20;
    maxGallons = 25;
  } else {
    return "Invalid number of cylinders";
  }

  const avgGallons = (minGallons + maxGallons) / 2;
  const regularCost = (avgGallons * 3.19).toFixed(2);
  const midCost = (avgGallons * 3.59).toFixed(2);
  const premiumCost = (avgGallons * 3.92).toFixed(2);

  return {
    gallonSize,
    regularCost,
    midCost,
    premiumCost,
  };
}

function reuturnGallonSize(cylinders: number) {
  if (cylinders === 4) {
    return "10-12";
  } else if (cylinders === 6) {
    return "15-17";
  } else if (cylinders === 8) {
    return "20-25";
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
    if (data.length !== 0) {
      return data[0].cylinders;
    }
    const cylinders = data.cylinders;
    return cylinders;
  } catch (error: any) {
    console.log(error);
  }
}

// async function getGasPrice(city: string) {
//   const url = "https://us-gas-prices.p.rapidapi.com/us/tx";
//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": process.env.GAS_PRICE_API_KEY || "",
//       "X-RapidAPI-Host": process.env.GAS_PRICE_HOST || "",
//     },
//   };
//   try {
//     const response = await fetch(url, options);
//     const data = await response.json();
//     return data;
//   } catch (error: any) {
//     console.log(error);
//   }
// }

async function getVehicleImage(
  carMake: string,
  carModel: string,
  year: string
) {
  const url = `https://google-search72.p.rapidapi.com/imagesearch?q=${carMake}+${carModel}+${year}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.GOOGLE_SEARCH_API_KEY || "",
      "X-RapidAPI-Host": process.env.GOOGLE_HOST || "",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const vehicleImage = data.items[0].originalImageUrl;
    return vehicleImage;
  } catch (error) {
    console.log(error);
    return error;
  }
}
