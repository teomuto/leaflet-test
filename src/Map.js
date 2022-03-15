import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import L from "leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { statesData } from "./data";
import Legend from "./Legend";

const center = [40, -97];

const Map = () => {
  const [map, setMap] = useState();
  const [selectedState, setSelectedState] = useState();
  const getColor = (d) => {
    return d > 1000
      ? "#800026"
      : d > 500
      ? "#BD0026"
      : d > 200
      ? "#E31A1C"
      : d > 100
      ? "#FC4E2A"
      : d > 50
      ? "#FD8D3C"
      : d > 20
      ? "#FEB24C"
      : d > 10
      ? "#FED976"
      : "#FFEDA0";
  };

  const hoverUpdate = (info) => {
    const div = document.getElementById("legenda-mapa");
    div.innerHTML =
      "<h4>US Population Density</h4>" +
      (info
        ? info.name + "</b><br />" + info.density + " people / mi<sup>2</sup>'"
        : "Hover over a state");
  };
  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{ width: "100vw", height: "100vh" }}
      whenCreated={setMap}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=qzpBsvh5sGEpjKMxviCf"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      ></TileLayer>
      {statesData.features.map((state) => {
        const coordinates = state.geometry.coordinates[0].map((item) => [
          item[1],
          item[0],
        ]);
        const info = state.properties;
        return (
          <Polygon
            pathOptions={{
              fillColor: getColor(info.density),
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: "white",
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 5,
                  dashArray: "",
                  color: "#666",
                  fillColor: getColor(info.density),
                });
                if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                  layer.bringToFront();
                } // Não sei se é necessário hoje em dia já que praticamente todos rodam com a engine do chrome
                hoverUpdate(info);
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: "3",
                  color: "white",
                  fillColor: getColor(info.density),
                });
                hoverUpdate();
              },
              click: (e) => {
                alert(
                  info.name + " has the population density of " + info.density
                );
              },
            }}
          ></Polygon>
        );
      })}
      <Legend map={map} selectedState={selectedState} />
    </MapContainer>
  );
};

export default Map;
