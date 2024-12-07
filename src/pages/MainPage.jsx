import React from "react";
import LoginForm from "@/components/custom_components/admin/LoginForm";

import Teams from "@/pages/Teams";

const MainPage = () => {
  return (
    <div>
      <LoginForm />

      <Teams />
    </div>
  );
};

export default MainPage;
