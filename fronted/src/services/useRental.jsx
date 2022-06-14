
export const useRental = () => {

    //Crear alquiler
    async function createRental(values) {
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
                //window.location.pathname = '/entrar';
            }))
            .catch(error => console.error(error))
    }

    return {
        createRental
    }
}