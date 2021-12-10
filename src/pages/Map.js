import React, { useRef, useState, useEffect } from "react";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidGNsb2htIiwiYSI6ImNqMDMwM3N3azA4N2cycWxzOXRxc2ExenQifQ.LNWEYTdZW2YaurDIgqXJtg';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-118.431133);
  const [lat, setLat] = useState(34.004421);
  const [zoom, setZoom] = useState(13);

  const [d, setD] = useState([]);


  const stores = {
      "type": "FeatureCollection",
      "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -118.431133,
          34.004421        
        ]
      },
      "properties": {
        "phoneFormatted": "(202) 234-7336",
        "phone": "2022347336",
        "address": "1471 P St NW",
        "city": "Washington DC",
        "country": "United States",
        "crossStreet": "at 15th St NW",
        "postalCode": "20005",
        "state": "D.C."
      }
    }
    ]
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

  const myZas = () => {
    fetch("http://localhost:4000/v1/pizzas", {
      method: 'GET',
      headers: {}
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setD(data.pizza)
    })
    .catch(err => console.error(err))
  }


  useEffect(() => {
    // if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('load', () => {
      map.current.addLayer({
        id: 'locations',
        type: 'circle',
        source: {
          type: 'geojson',
          data: stores
        }
      });
    });
  }, [lng, lat]);


  useEffect(() => {
    if (d && d.length) return
    myZas()
  }, [getLocation])

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