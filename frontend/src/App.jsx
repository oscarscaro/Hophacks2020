import React, { useEffect, useState } from "react";
import format from "string-format";
import config from "./config.json";
import Container from "./components/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DataVisualizer from "./components/DataVisualizer";
import DataBar from "./components/DataBar";
import DataBarToggler from "./components/DataBarToggler";
import Cover from "./components/Cover";
import LocationDetector from "./components/LocationDetector";

export default () => {
  let [selectedCounty, setSelectedCounty] = useState(null);
  let [dataBarToggled, setDataBarToggled] = useState(false);
  let [mapData, setMapData] = useState({ status: "loading" });
  let [dbData, setDbData] = useState({ status: "loading" });
  let [incidentData, setIncidentData] = useState({ status: "loading" });
  let [locationData, setLocationData] = useState({ status: "loading" });

  let loadMapData = async () => {
    console.log("Loading map information");
    let response = await fetch(config.site.api.map);
    if (response.ok) {
      let data = await response.json();
      setMapData({ status: "success", data });
      console.log("Map information loaded");
      loadLocationData();
      loadIncidentData();
    } else {
      setMapData({ status: "failed" });
      console.log("Failed loading map infomation");
    }
  };

  let loadDbData = async () => {
    console.log("Loading wild fire predictions");
    let response = await fetch(config.site.api.db);
    if (response.ok) {
      let data = await response.json();
      setDbData({ status: "success", data });
      console.log("Wild fire predictions loaded");
    } else {
      setDbData({ status: "failed" });
      console.log("Failed loading wild fire predictions");
    }
  };

  let loadIncidentData = async () => {
    console.log("Loading incident data");
    let response = await fetch(config.site.api.incident);
    if (response.ok) {
      let data = await response.json();
      setIncidentData({ status: "success", data });
      console.log("Incident data loaded");
    } else {
      setIncidentData({ status: "failed" });
      console.log("Failed loading incident data");
    }
  };

  let loadLocationData = async () => {
    console.log("Loading location data");
    let response = await fetch(config.site.api.ip);
    if (response.ok) {
      let data = await response.json();
      if (
        data.country !== "United States" ||
        data.regionName !== "California"
      ) {
        setLocationData({ status: "success", data });
        console.log("Location data loaded");
      } else {
        setLocationData({ status: "loading", data });
        let response = await fetch(format(config.site.api.zip, data.zip));
        if (response.ok) {
          let data = await response.json();
          let county = data[0].zipCodes[0].county_name;
          setLocationData({
            status: "success",
            data: {
              ...locationData.data,
              county,
            },
          });
          console.log("Location data loaded");
          setSelectedCounty(
            mapData.data.objects.subunits.geometries.filter(
              ({ properties: { name } }) => name === county
            )[0]
          );
          setDataBarToggled(true);
        } else {
          setLocationData({ status: "failed" });
          console.log("Failed loading location data");
        }
      }
    } else {
      setLocationData({ status: "failed" });
    }
  };

  let loadData = () => {
    let reset = mapData.status === "failed" || dbData.status === "failed";
    if (reset) {
      if (mapData.status === "failed") {
        setMapData({ status: "loading" });
        loadMapData();
      } else if (dbData.status === "failed") {
        setDbData({ status: "loading" });
        loadDbData();
      }
    } else if (mapData.status === "loading" && dbData.status === "loading") {
      loadMapData();
      loadDbData();
    }
  };

  useEffect(loadData);

  let vw = (x) => `${x}vw`;

  return (
    <Container background={config.site.style.background}>
      <div
        style={{
          width: vw(dataBarToggled ? 50 : 100),
          transition: "width 300ms ease",
          position: "relative",
        }}
      >
        <Header name={config.site.name} />
        {mapData.data && (
          <DataVisualizer
            data={mapData.data}
            incident={incidentData.data}
            db={dbData.data}
            selectedCounty={selectedCounty}
            onSelectCounty={(event, geo) => {
              if (geo != null && !dataBarToggled) {
                setDataBarToggled(true);
              }
              setSelectedCounty(geo);
              event.stopPropagation();
            }}
            zoomed={!dataBarToggled}
          />
        )}
        <Footer />
        <DataBarToggler
          toggled={dataBarToggled}
          onToggle={() => {
            setDataBarToggled(!dataBarToggled);
          }}
        />
      </div>
      <div
        style={{
          width: vw(dataBarToggled ? 50 : 0),
          transition: "width 300ms ease",
        }}
      >
        <DataBar selectedCounty={selectedCounty} incident={incidentData.data} />
      </div>
      <LocationDetector
        location={locationData}
        background={config.site.style.background}
        setSelectedCounty={setSelectedCounty}
      />
      <Cover
        display={mapData.status !== "success" && dbData.status !== "success"}
        background={config.site.style.background}
        name={config.site.name}
        status={{ map: mapData.status, db: dbData.status }}
        loadData={loadData}
      />
    </Container>
  );
};
