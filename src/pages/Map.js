import React, { useRef, useState, useEffect } from "react";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidGNsb2htIiwiYSI6ImNqMDMwM3N3azA4N2cycWxzOXRxc2ExenQifQ.LNWEYTdZW2YaurDIgqXJtg';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(11);

  const [data, setData] = useState([]);

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
    fetch("http://localhost:8000/get/mypizzas", {
      method: 'GET',
      headers: {}
    })
    .then(res => res.json())
    .then(data => {
      setData(data)
    })
    .catch(err => console.error(err))
  }


  useEffect(() => {
    // if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  }, [lng, lat]);


  useEffect(() => {
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