import React, { ReactNode, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

interface Props {
  coords: Array<{ lat: number; lng: number }>;
  children?: ReactNode;
}

const MapWithDirections = ({ coords, children }: Props) => {
  const [directions, setDirections] = useState<any>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAYNauIpdpsYQ9S_fBz1O_QWtR3bn_d_VI",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const directionsCallback = (response: any) => {
    if (response !== null) {
      if (response.status === "OK") {
        setDirections(response);
      } else {
        console.log("Directions request failed:", response.status);
      }
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: "60%",
        height: "100vh",
      }}
      center={coords[0]}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <DirectionsService
        options={{
          destination: coords[0],
          origin: coords[1],
          travelMode: google.maps.TravelMode.DRIVING,
        }}
        callback={directionsCallback}
      />
      {directions && (
        <DirectionsRenderer options={{ directions: directions }} />
      )}
      {children}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MapWithDirections;
