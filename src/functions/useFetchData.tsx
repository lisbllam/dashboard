import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface useFechtDataProps{
    data: OpenMeteoResponse | undefined;
    loading: boolean;
    error: string;
}

export default function useFetchData() : useFechtDataProps{
    const [data, setData] = useState<OpenMeteoResponse>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const  url = 'https://api.open-meteo.com/v1/forecast?latitude=-2.9005&longitude=-79.0045&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m';

    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(url);
            if(!response.ok){
                throw new Error('Error en la petición: ${response.status');
            }
            const json = await response.json();
            setData(json);
        } catch (error) {
            setError(String(error));
        } finally {
            setLoading(false);
        }
        };

        fetchData()

    }, []);

    return { data, loading, error}

}