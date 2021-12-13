import React, { useRef, useState, useEffect, useContext } from "react";
import { NetworkContext } from "../context/NetworkContext";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidGNsb2htIiwiYSI6ImNqMDMwM3N3azA4N2cycWxzOXRxc2ExenQifQ.LNWEYTdZW2YaurDIgqXJtg';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-118.431133);
  const [lat, setLat] = useState(34.004421);
  const [zoom, setZoom] = useState(13);
  const [dataReceived, setDataReceived] = useState(false);

  const { getVenuesPizza } = useContext(NetworkContext)

  const store = arrayOfFeature => {
    return {
      "type": "FeatureCollection",
      "features": arrayOfFeature
    }
  }

  const addMarkers = stores => {
    for (const marker of stores.features) {
      const bubble = document.createElement('div');
      const pointer = document.createElement('div');
      const container = document.createElement('div');
      bubble.id = `marker-${marker.properties.id}`;
      pointer.id = `pointer-${marker.properties.id}`;
      bubble.className = 'bubble';
      pointer.className = 'pointer';
      container.className = 'bubble-container';
      bubble.style.backgroundImage = `url(${marker.properties.image})`;

      container.append(pointer)
      container.append(bubble)

      new mapboxgl.Marker(container, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map.current)
    }
  }

  const getLocation = () => {
    if (navigator.geolocation) {

        function error(err) {
            console.error("To err is human", err)
        }

        navigator.geolocation.getCurrentPosition(getCoordinates, error)

    } else {
        alert("Geolocation is not supported in this browsers");
    }
  }

  const getCoordinates = position => {
    setLng(position.coords.longitude);
    setLat(position.coords.latitude);
  }

  useEffect(() => {
      if (dataReceived) { return }
      getVenuesPizza().then(res => {
        return res.json()
      }).then(data => {
        if (data && data.venuepizzas) {
          return data.venuepizzas.map(object => {
            return {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [
                  object.lon,
                  object.lat       
                ]
              },
              "properties": {
                "id": `${object.id}`,
                "image": `localhost:4000/v1/images/${object.pizza_image_id}`
              }
            }
          })
        }
      }).then(data => {
        const collection = store(data)
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v10',
          center: [lng, lat],
          zoom: zoom
        });
        map.current.on('load', () => {

          map.current.addSource('places', {
            'type': 'geojson',
            'data': collection
          });

          addMarkers(collection)
        });

        setDataReceived(true)
      })
  }, [lng, lat, dataReceived, getVenuesPizza, zoom]);

  return (
    <div>
      <div ref={mapContainer} className="min-h-90 w-full">
      <div className="absolute top-0 z-10 left-0 w-96 h-full bg-white rounded">
      <button 
      className="absolute top-0 z-10 bg-red-600 flex w-full justify-center py-2"
      onClick={() => getLocation()}>Current Location</button>
      </div>
      </div>
    </div>
  );

}