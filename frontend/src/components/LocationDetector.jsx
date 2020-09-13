import React from "react";
import { FaMapMarker } from "react-icons/fa";

export default ({ location, background }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      opacity: location.status === "loading" ? 1 : 0,
      transition: "opacity 300ms ease 300ms",
      pointerEvents: location.status === "loading" ? "auto" : "none",
      color: "white",
      background,
    }}
  >
    <style scoped>
      {`
      @-webkit-keyframes statusjump {
        0% {
          transform: translateY(-10%);
        }
        100% {
          transform: translateX(0);
        }
      }
      .status1 {
        transition: color 300ms ease;
      }
      .status1.loading {
        color: white;
      }
      .status1.loading svg {
        animation: statusjump 300ms ease infinite alternate;
      }
      .status1.success {
        color: #3498db;
      }
      .status1.failed {
        color: #e74c3c;
      }
    `}
    </style>
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        letterSpacing: ".25rem",
        textTransform: "uppercase",
        transition: "color 300ms ease",
      }}
      className={["status1", location.status].join(" ")}
    >
      <FaMapMarker style={{ fontSize: "8rem", margin: "1rem" }} />
      <br />
      <span>
        {
          {
            loading: "Finding your location",
            success: "Found your location",
            failed: "Failed finding your location",
          }[location.status]
        }
      </span>
      <div style={{ margin: "2rem" }}>
        <h1>
          {location.data && location.data.query
            ? location.data.query
            : "IP Address"}
        </h1>
        <h1>
          {location.data && location.data.country
            ? location.data.country
            : "Country / Region"}
        </h1>
        <h1>
          {location.data && location.data.regionName
            ? location.data.regionName
            : "State / Province"}
        </h1>
        <h1>
          {location.data && location.data.county
            ? location.data.county
            : "County"}
        </h1>
      </div>
    </div>
  </div>
);
