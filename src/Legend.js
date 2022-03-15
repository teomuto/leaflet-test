import { useEffect } from "react";
import L from "leaflet";
import "./Legend.css";

// Inicializar uma legenda default para depois atualizar manualmente via DOM
function Legend({ map }) {
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

  useEffect(() => {
    if (map) {
      // Legenda do estado
      const legend = L.control({ position: "topright" });
      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        div.id = "legenda-mapa";
        div.innerHTML = "<h1><b>Select a state</b></h1>";
        return div;
      };
      legend.addTo(map);

      // Legenda de escala
      var scale = L.control({ position: "bottomright" });
      scale.onAdd = function (map) {
        var div = L.DomUtil.create("div", "info legend");
        var grades = [0, 10, 20, 50, 100, 200, 500, 1000];
        var labels = [];
        var from, to;

        for (var i = 0; i < grades.length; i++) {
          from = grades[i];
          to = grades[i + 1];

          labels.push(
            '<i style="background:' +
              getColor(from + 1) +
              '"></i> ' +
              from +
              (to ? "-" + to : "+")
          );
        }
        div.innerHTML = labels.join("<br>");
        return div;
      };

      scale.addTo(map);
    }
  }, [map]); //here add map

  return null;
}

export default Legend;
