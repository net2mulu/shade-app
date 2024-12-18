import React from "react";

function RegisteredShadeTypes() {
  const data = {
    totalEnterprises: 2651,
    shadeTypes: [
      { color: "#15D1A4", name: "PLC", percentage: "50%" },
      { color: "#F8D8AB", name: "Union", percentage: "20%" },
      { color: "#B7DFED", name: "Private", percentage: "20%" },
      { color: "#DDCBFC", name: "Stock", percentage: "10%" },
    ],
  };

  return (
    <div className="w-full  mt-12">
      <div className="flex items-center mx-2 mb-4">
        <span className="text-[#1A1A1A] text-3xl font-bold mr-2">
          {data.totalEnterprises}
        </span>
        <span className="text-gray-500">Enterprises</span>
      </div>
      <div className="w-full  justify-between flex items-center">
        {data.shadeTypes.map((shadeType, i) => (
          <div
            key={i}
            className={`flex flex-col gap-8  items-start justify-center`}
            style={{
              width: shadeType.percentage,
              zIndex: data.shadeTypes.length - i,
            }}
          >
            <div
              className={`w-[110%]  h-8 rounded-full bg-[${shadeType.color}] border-x-4 border-y-2 border-white `}
            />
            <div
              className={`text-[#959595] flex flex-col ${
                i !== 0 && "ml-[10%]"
              }`}
            >
              <div className="flex items-center justify-start gap-4">
                <div
                  className={`w-2 h-2  bg-[${shadeType.color}] rounded-full`}
                ></div>

                <span className="text-lg font-bold">
                  {shadeType.percentage}
                </span>
              </div>
              <span className="ml-6 text-gray-500">{shadeType.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RegisteredShadeTypes;
