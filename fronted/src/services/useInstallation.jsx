
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
            await global.fetch(`http://localhost:8000/api/installations/${idInstallation }`, {
                method: 'GET',
                headers,
                credentials: 'include',
            }).then(response => response.json()
                .then(async retrieved => {
                    installation = await retrieved;
                    console.log(retrieved);
                }))
                .catch(error => console.error(error))
        }
        return installation;
    }


    return {
        getInstalationsSport,
        getInstallation,
    }
}