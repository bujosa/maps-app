import React from "react";

import { usesMapbox } from "../hooks/usesMapbox";

export const MapPage = () => {
  const { coords, setRef } = usesMapbox();
  return (
    <>
      <div className="info">
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={setRef} className="mapContainer" />
    </>
  );
};
