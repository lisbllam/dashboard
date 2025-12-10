import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface useFechtDataProps{
    data: OpenMeteoResponse | undefined;
    loading: boolean;
    error: string;
}

const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  'guayaquil': { latitude: -2.1962, longitude: -79.8862 },
  'quito' : { latitude: -0.2298, longitude: -78.525 },
  'manta' : { latitude: -0.9494, longitude: -80.7314 },
  'cuenca': { latitude: -2.9005, longitude: -79.0045 },
};

export default function useFetchData(selectedOption: string | null) : useFechtDataProps{
    const [data, setData] = useState<OpenMeteoResponse>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const cityConfig = selectedOption != null? CITY_COORDS[selectedOption] : CITY_COORDS['guayaquil'];
    const  url = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`;

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

    }, [selectedOption]);

    return { data, loading, error}

}