import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYnVqb3NhIiwiYSI6ImNra25ldzBlZDEzdnYydnBkZXNob2Q1a3cifQ.VQsp-0l_cbGfhyGnLnJigA";

const initialPoint = {
  lng: -69.8417,
  lat: 18.5195,
  zoom: 17.01,
};

export const MapPage = () => {
  const mapDiv = useRef();

  const [map, setMap] = useState();
  const [coords, setCoords] = useState(initialPoint);

  useEffect(() => {
    const mapbox = new mapboxgl.Map({
      container: mapDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [initialPoint.lng, initialPoint.lat],
      zoom: initialPoint.zoom,
    });
    setMap(mapbox);
  }, []);

  useEffect(() => {
    map?.on("move", () => {
      const { lng, lat } = map.getCenter();
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
    return map?.off("move");
  }, [map]);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={mapDiv} className="mapContainer" />
    </>
  );
};
