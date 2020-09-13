import React from "react";
import { FaMap, FaServer, FaUndoAlt } from "react-icons/fa";

export default ({ display, background, name, status, loadData }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      opacity: display ? 1 : 0,
      transition: "opacity 300ms ease 300ms",
      pointerEvents: display ? "auto" : "none",
      background
    }}
  >
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: "8rem",
          fontFamily: "arial",
          fontWeight: 900,
          letterSpacing: "4rem",
          textTransform: "uppercase",
          margin: "4rem",
        }}
      >
        {name}
      </h1>
      <style scoped>
        {`
          @-webkit-keyframes statusblink {
            0% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
          .status {
            width: 50%;
            display: inline-block;
            text-align: center;
            letter-spacing: .25rem;
            text-transform: uppercase;
            transition: color 300ms ease;
          }
          .status.loading {
            color: white;
          }
          .status.loading svg {
            animation: statusblink 300ms ease infinite alternate;
          }
          .status.success {
            color: #3498db;
          }
          .status.failed {
            color: #e74c3c;
          }
          .status.failed svg {
            transition: transform 300ms ease;
          }
          .status.failed:hover svg {
            transform: rotate(-180deg);
          }
        `}
      </style>
      <div className={["status", status.map].join(" ")}>
        {status.map !== "failed" && (
          <FaMap style={{ fontSize: "8rem", margin: "1rem" }} />
        )}
        {status.map === "failed" && (
          <FaUndoAlt
            style={{ fontSize: "8rem", margin: "1rem" }}
            onClick={loadData}
          />
        )}
        <br />
        <span>
          {
            {
              loading: "Loading map information",
              success: "Map information loaded",
              failed: "Failed loading map infomation",
            }[status.map]
          }
        </span>
      </div>
      <div className={["status", status.db].join(" ")}>
        {status.db !== "failed" && (
          <FaServer style={{ fontSize: "8rem", margin: "1rem" }} />
        )}
        {status.db === "failed" && (
          <FaUndoAlt
            style={{ fontSize: "8rem", margin: "1rem" }}
            onClick={loadData}
          />
        )}
        <br />
        <span>
          {
            {
              loading: "Loading wild fire predictions",
              success: "Wild fire predictions loaded",
              failed: "Failed loading wild fire predictions",
            }[status.db]
          }
        </span>
      </div>
    </div>
  </div>
);
