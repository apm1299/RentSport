
export const useRental = () => {

    //Crear alquiler
    async function createRental(values, rentals) {
        const headers = new Headers();
        headers.set("Accept", "application/ld+json");
        headers.set("Content-Type", "application/ld+json")

        await fetch('http://localhost:8000/api/rentals', {
            method: 'POST',
            headers,
            credentials: 'include',
            body: JSON.stringify(values, null, 2),
        }).then(response => response.json()
            .then(retrieved => {
               rentals = [...rentals, retrieved];
              // setWorkers((workers) => [...workers, retrieved]);

                
            }))
            .catch(error => console.error(error))
    }

    return {
        createRental
    }
}