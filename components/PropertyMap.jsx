"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import Spinner from "@/components/Spinner";

function PropertyMap({ property }) {
  const [coordinates, setCoordinates] = useState([99.505, -60.09]);
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const geocoder = L.Control.Geocoder.nominatim();
        const address = `${property.location.street}, ${property.location.zipcode}, ${property.location.city}, ${property.location.state}`;

        geocoder.geocode(address, (results) => {
          if (results.length === 0) {
            setGeocodeError(true);
            setLoading(false);
            return;
          }
          if (results && results.length > 0) {
            const { lat, lng } = results[0].center;
            setCoordinates([lat, lng]);
            setLoading(false);
          }
        });
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
        setLoading(false);
      }
    };

    fetchCoords();
  }, [property]);

  const ICON = icon({
    iconUrl: "/pointer.png",
    iconSize: [38, 38],
  });

  if (geocodeError) {
    return <p>No location found </p>;
  }

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <MapContainer
          center={coordinates}
          zoom={13}
          style={{ height: "400px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={coordinates} icon={ICON}>
            <Popup>{`Street: ${property.location.street}, 
            ZipCode: ${property.location.zipcode},
            city: ${property.location.city}, 
            state: ${property.location.state}`}</Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
}

export default PropertyMap;
