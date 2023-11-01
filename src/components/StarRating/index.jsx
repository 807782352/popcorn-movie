import React, { useState } from "react";
import "./index.css";
import Star from "../Star";

export default function StarRating({ maxRating = 5 }) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  return (
    <div className="container">
      <div className="stars">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => setRating(i + 1)}
            full={tempRating ? i + 1 <= tempRating : i + 1 <= rating}
            onHoverIn={() => {
              setTempRating(i + 1);
            }}
            onHoverOut={() => {
              setTempRating(0);
            }}
          />
        ))}
      </div>
      <p className="text">{tempRating || (rating || "")}</p>
    </div>
  );
}
