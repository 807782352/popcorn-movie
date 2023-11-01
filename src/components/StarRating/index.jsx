import React, { useState } from "react";
import "./index.css";
import Star from "../Star";

export default function StarRating({ maxRating = 5 }) {
  const [rating, setRating] = useState(0);

  return (
    <div className="container">
      <div className="stars">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star key={i} onRate={() => setRating(i + 1)} full={i+1 <= rating} />
        ))}
      </div>
      <p className="text">{rating || ""}</p>
    </div>
  );
}
