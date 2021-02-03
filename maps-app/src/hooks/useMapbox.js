import { useState, useEffect, useRef, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import { v4 } from "uuid";
import { Subject } from "rxjs";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYnVqb3NhIiwiYSI6ImNra25ldzBlZDEzdnYydnBkZXNob2Q1a3cifQ.VQsp-0l_cbGfhyGnLnJigA";

export const useMapbox = (initialPoint) => {
  const mapDiv = useRef();
  const setRef = useCallback((node) => {
    mapDiv.current = node;
  }, []);

  const markers = useRef({});

  const markerMovement = useRef(new Subject());
  const newMarker = useRef(new Subject());

  const map = useRef();
  const [coords, setCoords] = useState(initialPoint);

  const addMarker = useCallback((ev) => {
    const { lng, lat } = ev.lngLat;
    const marker = new mapboxgl.Marker();
    marker.id = v4();
    marker.setLngLat([lng, lat]).addTo(map.current).setDraggable(true);

    markers.current[marker.id] = marker;

    newMarker.current.next({
      id: marker.id,
      lat,
      lng,
    });

    marker.on("drag", ({ target }) => {
      const { id } = target;
      const { lng, lat } = target.getLngLat();
      markerMovement.current.next({
        id,
        lng,
        lat,
      });
    });
  }, []);

  useEffect(() => {
    const mapbox = new mapboxgl.Map({
      container: mapDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [initialPoint.lng, initialPoint.lat],
      zoom: initialPoint.zoom,
    });
    map.current = mapbox;
  }, [initialPoint]);

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

  // Add new marker
  useEffect(() => {
    map.current?.on("click", addMarker);
  }, [addMarker]);

  return {
    coords,
    setRef,
    markers,
    addMarker,
    markerMovement$: markerMovement.current,
    newMarker$: newMarker.current,
  };
};
