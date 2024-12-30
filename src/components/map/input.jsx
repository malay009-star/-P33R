import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import Image from "next/image";

const libraries = ["places"];
const GoogleMapMemo = React.memo(GoogleMap);

// eslint-disable-next-line react/display-name
const MapInput = React.memo(
  ({
    mapRef,
    getUserLoc = true,
    editable = true,
    height = "30vh",
    location,
  }) => {
    const { isLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_URL,
      libraries,
    });
    const [loaded, setLoaded] = useState(false);
    const autocompleteRef = useRef();

    // Handle map load
    const handleLoad = useCallback(
      (map) => {
        mapRef.current = map;
        setLoaded(true);
      },
      [mapRef]
    );

    useEffect(() => {
      if (!loaded || !mapRef.current) {
        console.log("Map is not loaded or reference is invalid.");
        return;
      }

      if (location && location.latitude && location.longitude) {
        console.log("Panning to location:", location);
        mapRef.current.panTo({
          lat: location.latitude,
          lng: location.longitude,
        });
        mapRef.current.setZoom(16);
      } else if (getUserLoc) {
        console.log("Getting user location...");
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              console.log("User location fetched:", userLocation);
              mapRef.current.panTo(userLocation);
              mapRef.current.setZoom(16);
            },
            (error) => {
              console.error("Error fetching user location:", error);
              const fallbackLocation = { lat: 40.7128, lng: -74.006 }; // New York City
              console.log("Fallback to default location:", fallbackLocation);
              mapRef.current.panTo(fallbackLocation);
              mapRef.current.setZoom(16);
            }
          );
        } else {
          console.error("Geolocation not supported.");
        }
      }
    }, [loaded, location, getUserLoc, mapRef]);

    // Autocomplete handlers
    const onLoadAutocomplete = useCallback((autocomplete) => {
      autocompleteRef.current = autocomplete;
    }, []);

    const onPlaceChanged = useCallback(() => {
      if (!autocompleteRef.current) return;

      const place = autocompleteRef.current.getPlace();
      if (!place.geometry || !place.geometry.location) return;

      mapRef.current.panTo(place.geometry.location);
      mapRef.current.setZoom(16);
    }, [mapRef]);

    if (loadError) {
      return <p>Failed to load Google Maps. Please try again later.</p>;
    }

    if (!isLoaded) {
      return <p>Loading map...</p>;
    }

    return (
      <div
        style={{
          height: height,
          width: "100%",
        }}
      >
        <GoogleMapMemo
          mapContainerStyle={{
            height: "100%",
            width: "100%",
          }}
          zoom={16}
          onLoad={handleLoad}
        >
          {/* Marker */}
          {loaded && location && location.latitude && location.longitude && (
            <Marker
              position={{
                lat: location.latitude,
                lng: location.longitude,
              }}
            />
          )}
          {/* Editable Marker */}
          {loaded && editable && (
            <div
              className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none"
              style={{ width: "50px", height: "50px" }}
            >
              <Image
                src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png"
                alt="marker"
                width={50}
                height={50}
                priority
              />
            </div>
          )}

          {/* Autocomplete Input */}
          <div className="absolute top-2 right-10 left-10">
            {loaded && editable && (
              <Autocomplete
                onLoad={onLoadAutocomplete}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Search Place here"
                />
              </Autocomplete>
            )}
          </div>
        </GoogleMapMemo>
      </div>
    );
  }
);

export default MapInput;
