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
      const { carMake, carModel, year, state } = req.body;
      const cylinders = await getCylinders(carMake, carModel);
      const averageCost = await calculateGasAverage(cylinders, state);
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

async function calculateGasAverage(cylinders: number, state: String) {
  const gasPrices = await getGasPrice();
  const stateGasPrice = gasPrices.result.find(
    (result: any) => result.name === state
  );
  const avgRegular = stateGasPrice.gasoline;
  const avgMid = gasPrices.midGrade;
  const avgPremium = gasPrices.premium;
  const gallonSize = reuturnGallonSize(cylinders);
  const avgRegularParsed = removeDollarSign(avgRegular);
  const avgMidParsed = removeDollarSign(avgMid);
  const avgPremiumParsed = removeDollarSign(avgPremium);

  let minGallons, maxGallons;

  if (cylinders === 4) {
    minGallons = 10;
    maxGallons = 16;
  } else if (cylinders === 6) {
    minGallons = 17;
    maxGallons = 20;
  } else if (cylinders === 8) {
    minGallons = 21;
    maxGallons = 26;
  } else {
    return "Invalid number of cylinders";
  }

  const avgGallons = (minGallons + maxGallons) / 2;
  const regularCost = (avgGallons * avgRegularParsed).toFixed(2);
  const midCost = (avgGallons * avgMidParsed).toFixed(2);
  const premiumCost = (avgGallons * avgPremiumParsed).toFixed(2);

  return {
    gallonSize,
    regularCost,
    midCost,
    premiumCost,
  };
}

const removeDollarSign = (price: string) => {
  return parseFloat(price.slice(1));
};

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
    console.log("Cylinder data =>", data);
    if (data.length !== 0) {
      return data[0].cylinders;
    }
    const cylinders = data.cylinders;
    return cylinders;
  } catch (error: any) {
    console.log(error);
    return error;
  }
}

async function getGasPrice() {
  const url = "https://gas-price.p.rapidapi.com/allUsaPrice";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.GAS_PRICE_API_KEY || "",
      "X-RapidAPI-Host": process.env.GAS_PRICE_HOST || "",
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("here data =>", data);
    return data;
  } catch (error: any) {
    console.log(error);
  }
}

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
