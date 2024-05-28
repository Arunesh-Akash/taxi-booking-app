import { UserLocationContext } from '@/context/UserLocationContext'
import { Marker } from 'react-map-gl';
import React, { useContext } from 'react'
import { SourceCordiContext } from '@/context/SourceCordiContext';
import { DestinationCordiContext } from '@/context/DestinationCordiContext';

function Markes() {
    const { userLocation, setUserLocation } = useContext(UserLocationContext)
    const { sourceCordinate, setSourceCordinate } = useContext(SourceCordiContext)
    const { destinationCordinate, setDestinationCordinate } = useContext(DestinationCordiContext)
    return (
        <div>
            <Marker
                longitude={userLocation?.lng}
                latitude={userLocation?.lat} anchor="bottom" >
                <img src={`/pin.png`} alt='image' className='w-10 h-10' />
            </Marker>

            {sourceCordinate?.length != 0 ?
                <Marker
                    longitude={sourceCordinate?.lng}
                    latitude={sourceCordinate?.lat} anchor="bottom" >
                    <img src={`/pin.png`} className='w-10 h-10' />
                </Marker> : null}

            {destinationCordinate?.length != 0 ?
                <Marker
                    longitude={destinationCordinate?.lng}
                    latitude={destinationCordinate?.lat} anchor="bottom" >
                    <img src={`/pin.png`} className='w-10 h-10' />
                </Marker> : null}

        </div>
    )
}

export default Markes