import React from "react";
import { Circles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader-container">
      <Circles color="#00BFFF" height={80} width={80} />;
    </div>
  );
};

export default Loader;
