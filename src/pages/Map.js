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
  const [data, setData] = useState([]);
  const [dataReceived, setDataReceived] = useState(false);

  const { getVenuesPizza } = useContext(NetworkContext)

  const feature = (lat, lon) => {
    return {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          lat,
          lon
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
  }

  let arr = [];

  const s = arrayOfFeature => {
    return {
      "type": "FeatureCollection",
      "features": arrayOfFeature
    }
  }

  const mockStores = {
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

  useEffect(() => {
    // if (map.current) return;
    if (dataReceived) return
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
          data: mockStores
        }
      });
    });
  }, [lng, lat]);


  useEffect(() => {
    if (dataReceived) { return }
    getVenuesPizza().then(res => {
      return res.json()
    }).then(data => {
      if (data && data.venuepizzas) {

        setData(data.venuepizzas.map(object => {
          return {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                object.venue_lon,
                object.venue_lat       
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
      }))

    }
    })
  }, [getLocation])


  useEffect(() => {
    console.log(arr)
  }, [arr])

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