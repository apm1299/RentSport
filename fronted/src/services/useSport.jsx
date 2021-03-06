import { useEffect, useState } from "react";


export const useSport = () => {

    const [sports, setSports] = useState([]);

    useEffect(() => {
        const callToGetSports = async () => {
            setSports(await getSports());
        }
        callToGetSports();
    }, []);

    async function getSports() {
        let sports = [];
        let headers = new Headers();
        headers.set("Accept", "application/ld+json");
        headers.set("Content-Type", "application/ld+json")
        await global.fetch(`http://localhost:8000/api/sports`, {
            method: 'GET',
            headers,
            credentials: 'include',
        }).then(response => response.json()
            .then(async retrieved => {
                sports = await retrieved['hydra:member'];
            }))
            .catch(error => console.error(error))
        return sports;
    }

    async function createSport(values) {

        const headers = new Headers();
        headers.set("Accept", "application/ld+json");
        headers.set("Content-Type", "application/ld+json")

        await fetch('http://localhost:8000/api/sports', {
            method: 'POST',
            headers,
            credentials: 'include',
            body: JSON.stringify(values, null, 2),
        }).then(response => response.json()
            .then(retrieved => {
                setSports((sports) => [...sports, retrieved]);
            }))
            .catch(error => console.error(error))
    }


    return {
        sports,
        createSport,
    }
}