import React, { useState } from "react";

import ReactMapGL, { Marker } from "react-map-gl";

import { useCoronaGlobalValues } from "../context";

const CoronaMap = () => {
  const { coronaGlobal } = useCoronaGlobalValues();
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 0,
    longitude: 0,
    zoom: 0
  });

  return (
    <div className="map">
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        {...viewport}
        onViewportChange={view => setViewport(view)}
      >
        {coronaGlobal.slice(0, 50).map(location => {
          return (
            <Marker
              key={location.Country + location.Lat}
              latitude={+location.Lat}
              longitude={+location.Long}
            >
              <div className="marker">
                <img src="/marker.svg" width="20" height="20" />
                <p className="marker-text">{location.total}</p>
              </div>
            </Marker>
          );
        })}
      </ReactMapGL>
    </div>
  );
};

export default CoronaMap;
