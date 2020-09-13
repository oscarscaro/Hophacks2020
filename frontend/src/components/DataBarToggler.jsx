import React from "react";
import { FaAngleLeft } from "react-icons/fa";

export default ({ toggled, onToggle }) => (
  <div
    style={{ position: "absolute", right: 0, top: 0, width: 56, height: 56 }}
    onClick={onToggle}
  >
    <FaAngleLeft
      style={{
        transition: "transform 300ms ease",
        transform: toggled ? "rotate(180deg)" : "rotate(0deg)",
        width: 56,
        height: 56,
      }}
      fill="white"
    />
  </div>
);
