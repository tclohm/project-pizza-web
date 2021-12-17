import React, { useRef, useState, useEffect, useContext } from "react";
import { NetworkContext } from "../context/NetworkContext";

import mapboxgl from 'mapbox-gl';
import swal from "sweetalert";

mapboxgl.accessToken = 'pk.eyJ1IjoidGNsb2htIiwiYSI6ImNqMDMwM3N3azA4N2cycWxzOXRxc2ExenQifQ.LNWEYTdZW2YaurDIgqXJtg';

const url = 'http://localhost:4000/v1/images/';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [open, setOpen] = useState(false);
  const [lng, setLng] = useState(-118.431133);
  const [lat, setLat] = useState(34.004421);
  const [data, setData] = useState([]);
  const [zoom, setZoom] = useState(15);
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
      bubble.className = 'bubble font-black';
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
            swal("Oops!\nYou denied geolocation permissions", "If this was a mistake, you can change it in your browser settings.", "error");
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
          setData(data.venuepizzas)
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
      {open?
      <div className="absolute rounded z-20 right-4 top-32">
        <div className="flex flex-col rounded bg-white w-12"> 
          <button className="border border-stone-200 rounded-t h-12 text-3xl hover:bg-gray-100">🧀</button>
          <button className="border-r border-l border-b border-stone-200 h-12 text-3xl hover:bg-gray-100">👅</button>
          <button className="border-r border-l border-b border-stone-200 h-12 text-3xl hover:bg-gray-100">🍅</button>
          <button className="border-r border-l border-stone-200 h-12 text-3xl hover:bg-gray-100">🧂</button>
          <button className="border border-stone-200 rounded-b h-12 text-3xl hover:bg-gray-100">🔥</button>
        </div>
      </div>
      :<></>
      }
      <div className="absolute rounded z-20 left-80 ml-4 top-20 flex flex-col bg-white w-8">
        <button 
        onClick={(e) => setZoom(zoom)}
        className="border rounded-t border-gray-900 border-b-0 shadow-sm h-8 w-8">+</button>
        <button
        onClick={(e) => setZoom(zoom)}
        className="border rounded-b border-gray-900 shadow-sm h-8 w-8">-</button>
      </div>
      <div ref={mapContainer} className="flex flex-col justify-end min-h-90 w-full">
        <div className="absolute top-0 z-10 left-0 w-80 h-full flex flex-col bg-white rounded">
          <p className="px-2 text-lg font-black border-b p-2">Los Angeles, CA</p>
          <button 
            className="absolute top-0 z-30 flex self-end p-2 m-2 border rounded hover:bg-gray-100"
            onClick={() => getLocation()}><i className="fas fa-location-arrow hover:bg-gray-100"></i></button>
            <div className="fixed z-20 py-10 overflow-y-auto">
            {data.map((obj, id) => (
              <div className="pl-2 py-2 w-80 border-b hover:bg-gray-100 cursor-pointer" key={id}>
                <div className="flex items-center">
                  <img className="h-12 w-12 rounded" src={url + `${obj.pizza_image_id}`} alt="pizza" />
                  <div className="px-2">
                  <p className="font-black">{obj.venue_name}</p>
                  <p className="font-extralight text-xs">{obj.venue_address}</p>
                  </div>
                </div>
              </div>
            ))} 
            </div>
        </div>
        <div className="absolute right-2 top-2 z-10">
          <button 
          onClick={() => setOpen(!open)}
          className="relative text-sm font-semibold text-gray-900 bg-white py-2 px-4 rounded-full ring-1 ring-gray-900 shadow-sm z-10">Filter</button>
        </div>
        <div className="flex justify-center bottom-4 left-8 mt-4 sticky z-10">
          <button className="relative left-48 text-sm font-semibold text-gray-900 bg-white py-2 px-4 rounded-full ring-1 ring-gray-900 shadow-sm z-10">View List</button>
        </div>
      </div>
    </div>
  );

}