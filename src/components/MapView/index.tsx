import { ReactNode, useState } from "react";
import GoogleMapReact from "google-map-react";
import { GoogleMap, Polyline } from "@react-google-maps/api";
import { withScriptjs, withGoogleMap } from "react-google-maps";
import MapWithDirections from "../MapWithDirections";

interface Props {
  coords: Array<{ lat: number; lng: number }>;
  children?: ReactNode;
}

function MapView({ coords, children }: Props) {
  const WrappedMap = withGoogleMap(MapWithDirections);

  const someCoords = [
    { lat: -11.6404209, lng: 27.4862251 },
    { lat: -11.6523408, lng: 27.5008188 },
  ];

  return (
    <>
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAYNauIpdpsYQ9S_fBz1O_QWtR3bn_d_VI" }}
        defaultCenter={coords[0]}
        defaultZoom={15}
      >
        {children}
      </GoogleMapReact> */}

      {/* <MapWithDirections
      /> */}
    </>
  );
}

export default MapView;
