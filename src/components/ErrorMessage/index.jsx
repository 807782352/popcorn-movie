import React from "react";

/**
 * 注：千万不要把名字命名为Error，这样会与本身的throw new Error() 冲突！
 */
export default function ErrorMessage({ message }) {
  return <p className="error"><span>⭕</span>{message}</p>;
}
