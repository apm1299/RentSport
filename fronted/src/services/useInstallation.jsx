
export const useInstallation = () => {

    async function getInstalationsSport(idCenter, idSport) {
        let installations = [];
        let headers = new Headers();
        headers.set("Accept", "application/ld+json");
        headers.set("Content-Type", "application/ld+json")
        await global.fetch(`http://localhost:8000/api/installations?center.id=${idCenter}${idSport ? `&sports.id=${idSport}` : ''}`, {
            method: 'GET',
            headers,
            credentials: 'include',
        }).then(response => response.json()
            .then(async retrieved => {
                installations = await retrieved['hydra:member'];
            }))
            .catch(error => console.error(error))
        return installations;
        //return Array.isArray(installations) ? installations[0] : null;
    }

    async function getInstallation(idInstallation = null) {
        let installation = null;
        if (idInstallation) {
            let headers = new Headers();
            headers.set("Accept", "application/ld+json");
            headers.set("Content-Type", "application/ld+json")
            await global.fetch(`http://localhost:8000/api/installations/${idInstallation}`, {
                method: 'GET',
                headers,
                credentials: 'include',
            }).then(response => response.json()
                .then(async retrieved => {
                    installation = await retrieved;
                }))
                .catch(error => console.error(error))
        }
        return installation;
    }
    //Crear instalacion
    async function createInstallation(values) {

        const headers = new Headers();
        headers.set("Accept", "application/ld+json");
        headers.set("Content-Type", "application/ld+json")

        await fetch('http://localhost:8000/api/installations', {
            method: 'POST',
            headers,
            credentials: 'include',
            body: JSON.stringify(values, null, 2),
        }).then(response => response.json()
            .then(retrieved => {
            }))
            .catch(error => console.error(error))
    }

    async function editInstallation(id, values) {
        await fetch(`http://localhost:8000/api/installations/${id}`, {
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
        getInstalationsSport,
        getInstallation,
        createInstallation,
        editInstallation,
    }
}