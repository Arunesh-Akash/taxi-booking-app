import React, { useContext, useEffect, useState } from 'react';
import { DestinationCordiContext } from '@/context/DestinationCordiContext';
import { SourceCordiContext } from '@/context/SourceCordiContext';

const session_token = '0fec0c31-2a81-4db1-88fb-42f29d30d541';
const access_token="pk.eyJ1IjoiYXJ1bmVzaDExIiwiYSI6ImNsd21qN3JhNjF4eTIyaW1tcTVuYXFiY3UifQ.Tz3PweLATV02vF4Xhk1Hgw"
const MAPBOX_RETRIEVE_URL = 'https://api.mapbox.com/search/searchbox/v1/retrieve/';

const AutocompleteAddress = () => {
    const [source, setSource] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [sourceChange, setSourceChange] = useState<any>(false);
    const [destinationChange, setDestinationChange] = useState<any>(false);
    const [sourceAddressList, setSourceAddressList] = useState<any>([]);
    const [destinationAddressList, setDestinationAddressList] = useState<any>([]);
    const { setSourceCordinate } = useContext(SourceCordiContext);
    const { setDestinationCordinate } = useContext(DestinationCordiContext);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (sourceChange) getAddress('source');
            if (destinationChange) getAddress('destination');
        }, 1000);
        return () => clearTimeout(delayDebounce);
    }, [source, destination]);

    const getAddress = async (type: string) => {
        try {
            const res = await fetch(`http://localhost:3000/api/search-address?q=${type === 'source' ? source : destination}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Network response was not ok: ${res.status} - ${res.statusText} - ${errorText}`);
            }
            const result = await res.json();
            if (type === 'source') setSourceAddressList(result);
            else setDestinationAddressList(result);
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };

    const onAddressClick = async (item: any, type: string) => {
        try {
            if (type === 'source') {
                setSource(item.full_address);
                setSourceAddressList([]);
                setSourceChange(false);
            } else {
                setDestination(item.full_address);
                setDestinationAddressList([]);
                setDestinationChange(false);
            }

            const res = await fetch(`${MAPBOX_RETRIEVE_URL}${item.mapbox_id}?session_token=${session_token}&access_token=${access_token}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) throw new Error('Network response was not ok');
            const result = await res.json();
            if (result.features && result.features.length > 0) {
                if (type === 'source') {
                    setSourceCordinate({
                        lng: result.features[0].geometry.coordinates[0],
                        lat: result.features[0].geometry.coordinates[1]
                    });
                } else {
                    setDestinationCordinate({
                        lng: result.features[0].geometry.coordinates[0],
                        lat: result.features[0].geometry.coordinates[1]
                    });
                }
            }
        } catch (error) {
            console.error(`Error retrieving ${type} coordinates:`, error);
        }
    };

    return (
        <div>
            <div className='relative'>
                <label className='text-gray-400'>Where From?</label>
                <input type='text' className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300'
                    onChange={(e) => { setSource(e.target.value); setSourceChange(true) }}
                    value={source}
                />
                {sourceAddressList?.suggestions && sourceChange &&
                    <div className='shadow-md p-1 rounded-md absolute w-full bg-white'>
                        {sourceAddressList.suggestions.map((item: any, index: number) => (
                            <h2 key={index} className='p-3 hover:bg-gray-100 cursor-pointer'
                                onClick={() => onAddressClick(item, 'source')}>{item.full_address}</h2>
                        ))}
                    </div>}
            </div>
            <div className='relative'>
                <label className='text-gray-400'>Where To?</label>
                <input type='text' className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300'
                    onChange={(e) => { setDestination(e.target.value); setDestinationChange(true) }}
                    value={destination}
                />
                {destinationAddressList?.suggestions && destinationChange &&
                    <div className='shadow-md p-1 rounded-md absolute w-full bg-white'>
                        {destinationAddressList.suggestions.map((item: any, index: number) => (
                            <h2 key={index} className='p-3 hover:bg-gray-100 cursor-pointer'
                                onClick={() => onAddressClick(item, 'destination')}>{item.full_address}</h2>
                        ))}
                    </div>}
            </div>
        </div>
    );
};

export default AutocompleteAddress;
