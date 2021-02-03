import React from "react";

import { useMapbox } from "../hooks/useMapbox";

export const MapPage = () => {
  const { coords, setRef } = useMapbox();
  return (
    <>
      <div className="info">
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={setRef} className="mapContainer" />
    </>
  );
};
