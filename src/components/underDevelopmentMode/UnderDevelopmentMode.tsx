import React from "react";
import { UpdateIcon } from "@/assets/Icons/UpdateIcon";

const UnderDevelopmentMode = () => {
  
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="max-w-lg mt-12 my-auto bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 text-primary" aria-hidden="true">
            <UpdateIcon />
          </div>
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-primary">
            Página em desenvolvimento
          </h1>
          <p className="text-gray-600">
            Estamos implementando melhorias para tornar sua experiência ainda
            melhor. Em breve, estaremos de volta com novidades!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopmentMode;
