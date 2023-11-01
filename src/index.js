import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css"
import StarRating from "./components/StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5}/>
    <StarRating maxRating={10}/>
    <StarRating />
  </StrictMode>
);
