import React from "react";

const RegisteredShadeTypes = () => {
  const data = [
    { type: "PLC", percentage: 59 },
    { type: "Union", percentage: 14 },
    { type: "Private", percentage: 7 },
    { type: "Stock", percentage: 10 },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Registered Shade Types</h2>
      {data.map((item, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <div
              className={`w-4 h-4 rounded-full mr-2 ${
                index === 0
                  ? "bg-blue-500"
                  : index === 1
                  ? "bg-green-500"
                  : index === 2
                  ? "bg-yellow-500"
                  : "bg-purple-500"
              }`}
            ></div>
            <span className="text-gray-700">{item.type}</span>
          </div>
          <span className="text-gray-700">{item.percentage}%</span>
        </div>
      ))}
    </div>
  );
};

export default RegisteredShadeTypes;
