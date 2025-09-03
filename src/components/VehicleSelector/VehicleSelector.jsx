import React from "react";
import {
  FaMotorcycle,
  FaTruckPickup,
  FaTruckMoving,
} from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const vehicleOptions = [
  {
    title: "Quick & Light",
    description: "Ideal for small parcels, documents, or lightweight items.",
    iconName: "FaMotorcycle",
    weight: "Max 20 KG",
    bg: "bg-orange-600",
  },
  {
    title: "Medium & Safe",
    description: "Perfect for electronics, boxes, and mid-size deliveries.",
    iconName: "FaTruckPickup",
    weight: "Max 750 KG",
    bg: "bg-orange-600",
  },
  {
    title: "Spacious & Strong",
    description: "Best for furniture, heavier goods, or stacked parcels.",
    iconName: "MdLocalShipping",
    weight: "Max 1.2 TON",
    bg: "bg-orange-600",
  },
  {
    title: "Heavy Duty",
    description: "For bulk deliveries, industrial items, or extra-large loads.",
    iconName: "FaTruckMoving",
    weight: "Max 3.5 TON",
    bg: "bg-orange-600",
  },
];

export default function VehicleSelector() {
  const navigate = useNavigate();

  const handleVehicleSelect = (vehicle) => {
    const { title, description, weight, bg, iconName } = vehicle;
    navigate("/select-parcel", {
      state: {
        selectedVehicle: {
          title,
          description,
          weight,
          bg,
          iconName,
        },
      },
    });
  };

  const iconMap = {
    FaMotorcycle: <FaMotorcycle className="text-4xl text-white" />,
    FaTruckPickup: <FaTruckPickup className="text-4xl text-white" />,
    MdLocalShipping: <MdLocalShipping className="text-4xl text-white" />,
    FaTruckMoving: <FaTruckMoving className="text-4xl text-white" />,
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-bold mb-8 text-center"
      >
        Select a vehicle based on your parcel’s size and weight.
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
        {vehicleOptions.map((vehicle, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleVehicleSelect(vehicle)}
            className={`rounded-xl p-6 cursor-pointer flex items-start gap-4 shadow-lg border border-white/10 ${vehicle.bg}`}
          >
            <div>{iconMap[vehicle.iconName]}</div>
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">{vehicle.title}</h2>
                <span className="text-sm font-semibold text-gray-300">
                  {vehicle.weight}
                </span>
              </div>
              <p className="text-sm text-gray-200 mt-2">{vehicle.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
