

export const useWallet = () => {

    //Actualizar Cartera
    async function updateWallet(id, totalOrder) {
        let data = {wallet: totalOrder};
        await fetch(`http://localhost:8000/api/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/merge-patch+json'
            },
            credentials: 'include',
            body: JSON.stringify(data, null, 2)
        }).then(response => response.json()
            .then(retrieved => {

            }))
            .catch(error => console.error(error))
    }

    return {
        updateWallet
    }
}