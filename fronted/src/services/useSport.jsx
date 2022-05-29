import { useState } from "react";


export const useSport = () => {
    const [sports, getSports] = useState([]);

    async function getSportCenter(idCenter) {

        let sports = [];
        let headers = new Headers();
        headers.set("Accept", "application/ld+json");
        headers.set("Content-Type", "application/ld+json")
        await global.fetch(`http://localhost:8000/api/sports/${idCenter}/center/installations`, {
            method: 'GET',
            headers,
            credentials: 'include',
        }).then(response => response.json()
            .then(async retrieved => {
                sports = await retrieved['hydra:member'];
                console.log(retrieved);
            }))
            .catch(error => console.error(error))

        return sports;
    }


    return {
        getSportCenter,
        getSports,
        sports,
    }
}