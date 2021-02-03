import React from "react";
import { SocketProvider } from "./context/SocketContext";
import { MapPage } from "./pages/MapPage";

export const MapsApp = () => {
  return (
    <SocketProvider>
      <MapPage />
    </SocketProvider>
  );
};
