import { useEffect, useState } from "react";


export const useIncome = () => {

    const [incomes, setIncomes] = useState([]);
    useEffect(() => {
        const callToGetCenters = async () => {
            setIncomes(await getIncomes());
        }
        callToGetCenters();
    }, []);

    async function getIncomes() {

        let incomes = [];
        let headers = new Headers();
        headers.set("Accept", "application/ld+json");
        headers.set("Content-Type", "application/ld+json")
        await global.fetch(`http://localhost:8000/api/incomes`, {
            method: 'GET',
            headers,
            credentials: 'include',
        }).then(response => response.json()
            .then(async retrieved => {
                incomes = await retrieved['hydra:member'];
            }))
            .catch(error => console.error(error))

        return incomes;
    }
    
    async function createIncome(values) {
        let datas = {userMade: values.userMade, date: values.date, quantity: values.quantity, userReceived: values.userReceived,};

        const headers = new Headers();
        headers.set("Accept", "application/ld+json");
        headers.set("Content-Type", "application/ld+json")
        await fetch('http://localhost:8000/api/incomes', {
            method: 'POST',
            headers,
            credentials: 'include',
            body: JSON.stringify(datas, null, 2),
        }).then(response => response.json()
            .then(retrieved => {
                setIncomes((incomes) => [retrieved, ...incomes]);
            }))
            .catch(error => console.error(error))
    }

    return {
        createIncome,
        incomes,
    }
}