import React from 'react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import firebase from "./firebase"
const collegeCoords = {
  lat:  12.866628, 
  lng: 80.219708
};

const options = {
  // styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Maps = ({height,width}) => {
    
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });
  const containerStyle = {
    width: width,
    height: height
  };
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const realtimeCoords = firebase.db.collection("coords").doc("bus1");
 
  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
    
  return isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={collegeCoords}
            zoom={11}
            options = {options}
          >
          <Marker
            position={collegeCoords}
          >
          </Marker>
          </GoogleMap>
      ) : <></>
}
 
export default React.memo(Maps)