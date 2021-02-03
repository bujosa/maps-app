import React, { useEffect } from "react";
import { useMapbox } from "../hooks/useMapbox";

const initialPoint = {
  lng: -69.8417,
  lat: 18.5195,
  zoom: 17.01,
};

export const MapPage = () => {
  const { coords, setRef, newMarker$, markerMovement$ } = useMapbox(
    initialPoint
  );

  useEffect(() => {
    newMarker$.subscribe((marker) => {});
  }, [newMarker$]);

  useEffect(() => {
    markerMovement$.subscribe((marker) => {});
  }, [markerMovement$]);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={setRef} className="mapContainer" />
    </>
  );
};
