import { useState, useEffect, useRef, useCallback } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYnVqb3NhIiwiYSI6ImNra25ldzBlZDEzdnYydnBkZXNob2Q1a3cifQ.VQsp-0l_cbGfhyGnLnJigA";

const initialPoint = {
  lng: -69.8417,
  lat: 18.5195,
  zoom: 17.01,
};

export const usesMapbox = () => {
  const mapDiv = useRef();

  const setRef = useCallback((node) => {
    mapDiv.current = node;
  }, []);

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

  return {
    coords,
    setRef,
  };
};
