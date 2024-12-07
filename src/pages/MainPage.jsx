import React from "react";
import LoginForm from "@/components/custom_components/admin/LoginForm";
import MainLogo from "@/assets/images/logo.png";
import AccessLogo from "@/assets/images/access_logo.png";
import FormulaLogo from "@/assets/images/formula_logo.png";
import Teams from "@/pages/Teams";

const MainPage = () => {
  return (
    <div className="bg-[#222222] flex flex-col justify-center items-center gap-6">
      <img src={MainLogo} alt="Cpe Fair Logo" className="max-w-[200px]" />
      <div className="w-full max-w-[1200px] ">
        <div className="text-white flex flex-col text-center">
          <h1 className="font-formula1Bold text-5xl">THE CPE GRAND PRIX</h1>
          <p className="font-formula1">MINI GAMES LEADERBOADS</p>
        </div>
        <Teams />
        <div className="flex justify-between items-center">
          <img
            src={AccessLogo}
            alt="Access Logo"
            className="max-w-[60px] object-cover"
          />
          <LoginForm />
          <img
            src={FormulaLogo}
            alt="Formula 1 Logo"
            className="max-w-[100px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
