import React from "react";
import { animated } from "react-spring";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { FaFire } from "react-icons/fa";

let DataVisualizer = ({
  data,
  incident,
  db,
  selectedCounty,
  onSelectCounty,
  zoomed,
}) => (
  <ComposableMap
    projection="geoAzimuthalEqualArea"
    projectionConfig={{
      rotate: [119.5, 322.5, 40],
      scale: 4800,
    }}
    style={{
      maxHeight: zoomed ? "calc(100vh - 2 * 56px)" : "calc(50vh - 56px)",
      marginTop: zoomed ? "0" : "calc(25vh - 28px)",
      marginBottom: zoomed ? "0" : "calc(25vh - 28px)",
      transition: "max-height 300ms ease, margin 300ms ease",
      overflow: "visible",
    }}
    onClick={(event) => onSelectCounty(event, null)}
  >
    <style scoped>
      {`
        .county {
          transition: fill 300ms ease;
        }
        :focus {
          outline: none;
        }
      `}
    </style>
    <Geographies geography={data}>
      {({ geographies }) =>
        geographies.map((geo) => {
          return (
            <Geography
              id={geo.rsmKey}
              key={geo.rsmKey}
              geography={geo}
              fill="#EEE"
              stroke={
                selectedCounty != null && selectedCounty.rsmKey === geo.rsmKey
                  ? "#000"
                  : "#CCC"
              }
              strokeWidth={2}
              className="county"
              onClick={(event) => onSelectCounty(event, geo)}
            />
          );
        })
      }
    </Geographies>
    {selectedCounty != null && <use href={`#${selectedCounty.rsmKey}`} />}
    <radialGradient id="fireMarker">
      <stop offset="0%" stopColor="rgba(255, 0, 0, 0.75)" />
      <stop offset="100%" stopColor="rgba(255, 255, 0, 0)" />
    </radialGradient>
    {db &&
      db.objects.myJson.geometries.map(
        ({ properties, coordinates }) =>
          properties.prediction === "burned" && (
            <Marker coordinates={coordinates}>
              <circle
                r={20}
                fill="url(#fireMarker)"
                style={{ pointerEvents: "none" }}
              />
            </Marker>
          )
      )}
    {incident &&
      incident.map(
        ({ Latitude, Longitude, AcresBurned }) =>
          Longitude &&
          Latitude && (
            <Marker coordinates={[Longitude, Latitude]}>
              <FaFire
                style={{
                  color: AcresBurned > 0 ? "red" : "yellow",
                  fontSize: "2rem",
                  pointerEvents: "none",
                }}
              />
            </Marker>
          )
      )}
  </ComposableMap>
);

export default animated(DataVisualizer);
