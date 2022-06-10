import { useEffect, useState } from "react";


export const useSport = () => {

    const [sports, setSports] = useState([]);

    useEffect(() => {
        async function getSports() {
            let headers = new Headers();
            headers.set("Accept", "application/ld+json");
            headers.set("Content-Type", "application/ld+json")
            await global.fetch(`http://localhost:8000/api/sports`, {
                method: 'GET',
                headers,
                credentials: 'include',
            }).then(response => response.json()
                .then(async retrieved => {
                    setSports(await retrieved['hydra:member']);
                }))
                .catch(error => console.error(error))
        }
        getSports()
    }, [])
    

    

    return {
        sports,
    }
}