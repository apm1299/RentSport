

export const useSport = () => {


    //Actualizar Cartera
    async function updateWallet(id, values) {
        await fetch(`http://localhost:8000/api/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/merge-patch+json'
            },
            credentials: 'include',
            body: JSON.stringify(values, null, 2)
        }).then(response => response.json()
            .then(retrieved => {

            }))
            .catch(error => console.error(error))
    }

    return {
        updateWallet
    }
}