

export const useWallet = () => {

    //Actualizar Cartera
    async function updateWallet(id, values) {
        let data = {wallet: values.wallet};
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

    async function collectionMoney(id, money) {
        let data = {wallet: `${money}`};
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
        updateWallet,
        collectionMoney
    }
}