import React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API';
import LogEntryForm from './LogEntryForm';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup ] = useState([]);
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 50,
    longitude: -85,
    zoom: 4
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

 /* eslint-disable */
  useEffect(() => {
    getEntries();
  }, []);
 /* eslint-enable */

 const showaddMarkerPopup = (event) => {
   console.log(event);
   const [longitude, latitude ] = event.lngLat;
   setAddEntryLocation({
      latitude,
      longitude
   })
 };

  return (
    <ReactMapGL
      {...viewport}
      // mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
      mapStyle="mapbox://styles/justinpala/cke4txdyu01um1ao4oy1njazk"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange= {setViewport}
      onDblClick={showaddMarkerPopup}
      >
      {
        logEntries.map(entry => (
          <React.Fragment key={entry._id}>
            <Marker 
            latitude={entry.latitude} 
            longitude={entry.longitude} 
            offsetLeft={-12}
            offsetTop={-24}>
            {/* <div>{entry.title}</div> */}
            <div
              onClick={() => setShowPopup({
                // ...showPopup,
                [entry._id]: true,
              })}>
            {/* <svg className="marker"
                style = {{
                  width: '24px',
                  height: '24px'
                }} 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="1.5" fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z">
                  <circle cx="12" cy="10" r="3">
                  </circle>
                </path>     
            </svg> */}
            <img 
            className="marker" 
            src="https://camo.githubusercontent.com/cddc882fe09acd291ab88edb3fd8f8f22f511f34/687474703a2f2f69636f6e732e69636f6e617263686976652e636f6d2f69636f6e732f70616f6d656469612f736d616c6c2d6e2d666c61742f3235362f6d61702d6d61726b65722d69636f6e2e706e67" 
            alt='marker'>
            </img>
            </div>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                latitude={entry.latitude} 
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setShowPopup({})}
                anchor="top" >
                <div className='popup'>
                  <h3>{entry.title}</h3>
                  <p>{entry.comments}</p>
              <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                {entry.image && <img src={entry.image} alt={entry.title}></img>}
                </div>
              </Popup>
              ) : null
            }
        </React.Fragment>
        ))
      }
      {
        addEntryLocation ? (
          <>
          <Marker 
            latitude={addEntryLocation.latitude} 
            longitude={addEntryLocation.longitude}>
            <div>
              <svg className="markerYellow"
                style = {{
                  width: '24px',
                  height: '24px'
                }} 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="1.5" fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z">
                  <circle cx="12" cy="10" r="3">
                  </circle>
                </path>     
            </svg>
            {/* <img 
            className="marker red" 
            src="https://camo.githubusercontent.com/cddc882fe09acd291ab88edb3fd8f8f22f511f34/687474703a2f2f69636f6e732e69636f6e617263686976652e636f6d2f69636f6e732f70616f6d656469612f736d616c6c2d6e2d666c61742f3235362f6d61702d6d61726b65722d69636f6e2e706e67" 
            alt='marker'>
            </img> */}
            </div>
          </Marker>
          <Popup
                latitude={addEntryLocation.latitude} 
                longitude={addEntryLocation.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}void
                onClose={() => setAddEntryLocation(null)}
                anchor="bottom" >
                <div className='popup'>
                  <LogEntryForm 
                    onClose={() => {
                      setAddEntryLocation(null);
                      getEntries();
                    }}
                    location={addEntryLocation}>
                  </LogEntryForm>
                </div>
          </Popup>
          </>
        ) : null
      }
    </ReactMapGL>
  );
}

export default App;
