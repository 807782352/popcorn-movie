import React, { useState } from "react";
import "./index.css";
import Star from "../Star";

/**
 *
 * @param {onSetRating} 外部接口（方法），可以把内部的rating值传递出去
 * @returns
 */
export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating = null,
}) {
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  return (
    <div className={`container ${className}`}>
      <div className="stars">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => {
              setRating(i + 1);
              if (onSetRating) {
                onSetRating(i + 1);
              }
            }}
            full={tempRating ? i + 1 <= tempRating : i + 1 <= rating}
            onHoverIn={() => {
              setTempRating(i + 1);
            }}
            onHoverOut={() => {
              setTempRating(0);
            }}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}
