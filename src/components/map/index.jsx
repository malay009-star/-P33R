import React, { useRef, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Skeleton from "react-loading-skeleton";
import { ListingCard } from "./card";
// import { ListingCard } from "../product/card";

const libraries = ["places"];

function MapView({ location, products = [] }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_URL,
    libraries: libraries,
  });

  const mapRef = useRef();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [data, setData] = useState(null);

  if (!isLoaded) {
    return (
      <div
        style={{
          position: "sticky",
          height: "70vh",
          width: "100%",
          top: 10,
        }}
      >
        <Skeleton height={"100%"} width={"100%"} />
      </div>
    );
  }

  function handleLoad(map) {
    mapRef.current = map;
  }

  return (
    <div
      style={{
        position: "sticky",
        height: "70vh",
        width: "100%",
        top: 100,
      }}
    >
      <GoogleMap
        mapContainerStyle={{
          height: "100%",
          width: "100%",
        }}
        id="map"
        center={location}
        zoom={16}
        onLoad={handleLoad}
        ref={mapRef}
      >
        {products.map((data, index) => {
          const location = {
            lat: data?.location?.latitude,
            lng: data?.location?.longitude,
          };

          if (!location.lat || !location.lng) {
            return null;
          }

          return (
            <Marker
              key={index}
              position={location}
              onClick={() => {
                setSelectedMarker(location);
                setData(data);
              }}
            />
          );
        })}

        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.lat,
              lng: selectedMarker.lng,
            }}
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
          >
            <ListingCard listingData={data} />
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default MapView;
