import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export default function useFetchData() : OpenMeteoResponse | undefined{
    const  URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.9005&longitude=-79.0045&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m';

    const [data, setData] = useState<OpenMeteoResponse>();

    useEffect(() => { 
        fetch(URL)
        .then(data => data.json())
        .then(obj => {
            setData(obj);
        })
    }, []); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return data;

}