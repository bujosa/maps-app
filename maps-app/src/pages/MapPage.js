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
  const map = useRef();
  const [coords, setCoords] = useState(initialPoint);

  useEffect(() => {
    const mapbox = new mapboxgl.Map({
      container: mapDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [initialPoint.lng, initialPoint.lat],
      zoom: initialPoint.zoom,
    });
    map.current = mapbox;
  }, []);

  useEffect(() => {
    map.current?.on("move", () => {
      const { lng, lat } = map.current.getCenter();
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.current.getZoom().toFixed(2),
      });
    });
    return map.current?.off("move");
  }, []);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={mapDiv} className="mapContainer" />
    </>
  );
};
