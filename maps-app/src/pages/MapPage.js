import React, { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { useMapbox } from "../hooks/useMapbox";

const initialPoint = {
  lng: -69.8417,
  lat: 18.5195,
  zoom: 17.01,
};

export const MapPage = () => {
  const {
    coords,
    setRef,
    newMarker$,
    markerMovement$,
    addMarker,
    updatePosition,
  } = useMapbox(initialPoint);

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("markers", (markers) => {
      for (const key of Object.keys(markers)) {
        addMarker(markers[key], key);
      }
    });
  }, [socket, addMarker]);

  useEffect(() => {
    newMarker$.subscribe((marker) => {
      socket.emit("new-marker", marker);
    });
  }, [newMarker$, socket]);

  useEffect(() => {
    markerMovement$.subscribe((marker) => {
      socket.emit("update-marker", marker);
    });
  }, [markerMovement$, socket]);

  useEffect(() => {
    socket.on("new-marker", (marker) => {
      addMarker(marker, marker.id);
    });
  }, [socket, addMarker]);

  useEffect(() => {
    socket.on("update-marker", (marker) => {
      updatePosition(marker);
    });
  }, [socket, updatePosition]);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={setRef} className="mapContainer" />
    </>
  );
};
