import { useEffect, useState } from 'react'
import useDebounce from "./useDebounce"

export const useCenter = () => {
    const [searchCenter, setSearch] = useState('');
    const debounce = useDebounce(searchCenter, 300)
    const [centers, setCenters] = useState([]);
    const [center, setCenter] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const callToGetCenters = async () => {
            setCenters(await getCenters());
        }
        callToGetCenters();
    }, []);
    useEffect(() => {
        if (debounce !== undefined) {
            const callToGetCenters = async () => {
                setCenters(await getCenters(debounce));
            }
            callToGetCenters();
        }
    }, [debounce]);


    async function getCenters(search = '') {

        let centers = [];
        let headers = new Headers();
        headers.set("Accept", "application/ld+json");
        headers.set("Content-Type", "application/ld+json")
        await global.fetch(`http://localhost:8000/api/centers${search ? `?name=${search}` : ''}`, {
            method: 'GET',
            headers,
            credentials: 'include',
        }).then(response => response.json()
            .then(async retrieved => {
                centers = await retrieved['hydra:member'];
            }))
            .catch(error => console.error(error))

        return centers;
    }

    async function getCenter(id) {
        let center = null;
        let headers = new Headers();
        headers.set("Accept", "application/ld+json");
        headers.set("Content-Type", "application/ld+json")
        await global.fetch(`http://localhost:8000/api/centers/${id}`, {
            method: 'GET',
            headers,
            credentials: 'include',
        }).then(response => response.json()
            .then(async retrieved => {
                center = await retrieved;
                console.log(retrieved);
            }))
            .catch(error => console.error(error))
        return center;
    }


    return {
        getCenter,
        setSearch,
        centers,
        center,
        isLoading,
        setLoading,
        setCenter,
    }
}