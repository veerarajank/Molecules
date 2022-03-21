import { useEffect, useState } from "react"
export const useFetch = (url) => {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            setStatus("fetching");
            const response = await fetch(url);
            setData(await response.json());
            setStatus("fetched");
        }
        fetchData();
    },[url]);
    return { status, data } 
}