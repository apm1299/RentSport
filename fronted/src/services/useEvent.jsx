import { useEffect, useState } from "react";

export const useEvent = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const callToGetCenters = async () => {
            setEvents(await getEvents());
        }
        callToGetCenters();
    }, []);

    //Coger eventos
    async function getEvents() {
        let event = [];
            let headers = new Headers();
            headers.set("Accept", "application/ld+json");
            headers.set("Content-Type", "application/ld+json")
            await global.fetch(`http://localhost:8000/api/rentals?type.id=2`, {
                method: 'GET',
                headers,
                credentials: 'include',
            }).then(response => response.json()
                .then(async retrieved => {
                    event = await retrieved['hydra:member'];
                }))
                .catch(error => console.error(error))
        return event;
    }

    //Coger eventos de un centro
    async function getEventsCenter(idCenter) {
        let event = [];
            let headers = new Headers();
            headers.set("Accept", "application/ld+json");
            headers.set("Content-Type", "application/ld+json")
            await global.fetch(`http://localhost:8000/api/rentals?type.id=2&installation.center.id=${idCenter}`, {
                method: 'GET',
                headers,
                credentials: 'include',
            }).then(response => response.json()
                .then(async retrieved => {
                    event = await retrieved['hydra:member'];
                }))
                .catch(error => console.error(error))
        return event;
    }

    return {
        events,
        getEventsCenter
    }
}