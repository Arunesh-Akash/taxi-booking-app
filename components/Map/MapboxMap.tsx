'use client'
import { UserLocationContext } from '@/context/UserLocationContext';
import React, { useContext, useEffect, useRef } from 'react'
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Markes from './Markes';
import { SourceCordiContext } from '@/context/SourceCordiContext';
import { DestinationCordiContext } from '@/context/DestinationCordiContext';
import { DirectionDataContext } from '@/context/DirectionDataContext';
import MapRoute from './MapRoute';

export const MapboxMap = () => {
  const mapRef = useRef<any>();
  const MAPBOX_DRIVING_ENDPOINT = "https://api.mapbox.com/directions/v5/mapbox/driving/"
  const session_token = "0fec0c31-2a81-4db1-88fb-42f29d30d541"
  const access_token="pk.eyJ1IjoiYXJ1bmVzaDExIiwiYSI6ImNsd21qN3JhNjF4eTIyaW1tcTVuYXFiY3UifQ.Tz3PweLATV02vF4Xhk1Hgw"
  const { userLocation, setUserLocation } = useContext(UserLocationContext)
  const { sourceCordinate, setSourceCordinate } = useContext(SourceCordiContext)
  const { destinationCordinate, setDestinationCordinate } = useContext(DestinationCordiContext)
  const { directionData, setDirectionData } = useContext(DirectionDataContext);

  useEffect(() => {
    if (sourceCordinate) {
      mapRef.current?.flyTo({
        center: [
          sourceCordinate.lng,
          sourceCordinate.lat
        ],
        duration: 2500
      })
    }
  }, [sourceCordinate])

  useEffect(() => {
    if (destinationCordinate) {
      mapRef.current?.flyTo({
        center: [
          destinationCordinate.lng,
          destinationCordinate.lat
        ],
        duration: 2500
      })
    }

    if (sourceCordinate && destinationCordinate) {
      getDirectionRoute();
    }

  }, [destinationCordinate])

  const getDirectionRoute = async () => {
    const res = await fetch(MAPBOX_DRIVING_ENDPOINT + sourceCordinate.lng + "," + sourceCordinate.lat + ";" +
      destinationCordinate.lng + "," +
      destinationCordinate.lat +
      "?overview=full&geometries=geojson" +
      "&access_token=" + access_token, {
      headers: {
        "Content-Type": "application/json"
      }
    }
    )
    const result = await res.json();
    setDirectionData(result)
  }

  return (
    <div className='p-5'>
      <h2 className='text-[20px] font-semibold'>Map</h2>
      <div className='rounded-lg overflow-hidden'>
        {
          userLocation ?
            <Map
              ref={mapRef}
              mapboxAccessToken="pk.eyJ1IjoiYXJ1bmVzaDExIiwiYSI6ImNsd21qN3JhNjF4eTIyaW1tcTVuYXFiY3UifQ.Tz3PweLATV02vF4Xhk1Hgw"
              initialViewState={{
                longitude: userLocation?.lng,
                latitude: userLocation?.lat,
                zoom: 14
              }}
              style={{ width: '100%', height: 600, borderRadius: 10 }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >

              <Markes />
              {
                directionData?.routes ? (
                  <MapRoute coordinates={directionData?.routes[0]?.geometry?.coordinates} />
                ) : null
              }
            </Map> : null

        }
      </div>
    </div>

  )
}
