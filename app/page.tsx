"use client"
import { Booking } from "@/components/Booking/Booking";
import { MapboxMap } from "@/components/Map/MapboxMap";
import { CarAmountContext } from "@/context/CarAmountContext";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useEffect, useState } from "react";
export default function Home() {
  const [userLocation, setUserLocation] = useState<any>()
  const [sourceCordinate, setSourceCordinate] = useState<any>([])
  const [destinationCordinate, setDestinationCordinate] = useState<any>([])
  const [directionData, setDirectionData] = useState<any>([])
  const [carAmount, setCarAmount] = useState<any>()
  useEffect(() => {
    getUserLocation()
  }, [])
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      })
    })
  }
  
  return (
    <div>
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <SourceCordiContext.Provider value={{ sourceCordinate, setSourceCordinate }}>
          <DestinationCordiContext.Provider value={{ destinationCordinate, setDestinationCordinate }}>
            <DirectionDataContext.Provider value={{directionData,setDirectionData}}>
              <CarAmountContext.Provider value={{carAmount,setCarAmount}}>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div>
                <Booking />
              </div>
              <div className="col-span-2">
                <MapboxMap />
              </div>
            </div>
            </CarAmountContext.Provider>
            </DirectionDataContext.Provider>
          </DestinationCordiContext.Provider>
        </SourceCordiContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}
