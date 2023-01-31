import React from "react";
import img from "@/assets/webpack.png";

const App = () => {
  console.log("salam");
  
  return (
    <div className="container">
      <h1>Webpack Dev Server</h1>
      <img src={img} alt="Webpack" />
    </div>
  );
};

export default App;
