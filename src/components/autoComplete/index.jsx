import React, { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import "./index.css";

const CustomAutocomplete = ({ setAddress, setLocation }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["geocode"],
      componentRestrictions: { country: "us" },
      fields: ["address_components", "formatted_address", "geometry", "name"],
    },
    debounce: 300,
  });

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then((results) => {
        console.log(results);
        const { lat, lng } = getLatLng(results[0]);
        setLocation({ lat, lng });
      });
    };

  return (
    <React.Fragment>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Where are you going?"
        className="filter-box-placeholder w-full"
      />
      {status === "OK" && (
        <ul className="autocomplete-dropdown">
          {data.map((suggestion) => {
            const {
              place_id,
              structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
              <li key={place_id} onClick={handleSelect(suggestion)}>
                <p>{main_text}</p>
              </li>
            );
          })}
        </ul>
      )}
    </React.Fragment>
  );
};

export default CustomAutocomplete;
