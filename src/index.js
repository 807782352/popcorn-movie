import React, { StrictMode, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"
// import StarRating from "./components/StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
    {/* <Test />
    <StarRating maxRating={10} />
    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    /> */}
  </StrictMode>
);

// function Test() {
//   const [rating, setRating] = useState(0);
//   return (
//     <div>
//       <StarRating
//         maxRating={5}
//         messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
//         onSetRating={setRating}
//       />
//       <p>The rating is {rating}</p>
//     </div>
//   );
// }
