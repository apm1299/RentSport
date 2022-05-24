
export async function getCenters(search='') {

    let centers = [];
    let headers = new Headers();
    headers.set("Accept", "application/ld+json");
    headers.set("Content-Type", "application/ld+json")
    await global.fetch(`http://localhost:8000/api/centers${search ? `?name=${search}` : ''}`, {
        method: 'GET',
        headers,
        credentials: 'include',
    }).then(response => response.json()
    .then(async retrieved => {
        centers = await retrieved['hydra:member'];
        console.log(retrieved);
    }))
    .catch(error => console.error(error))

    return centers;
}

export async function getCenter(id) {
    let center = null;
    let headers = new Headers();
    headers.set("Accept", "application/ld+json");
    headers.set("Content-Type", "application/ld+json")
    await global.fetch(`http://localhost:8000/api/centers/${id}`, {
        method: 'GET',
        headers,
        credentials: 'include',
    }).then(response => response.json()
    .then(async retrieved => {
        center = await retrieved;
        console.log(retrieved);
    }))
    .catch(error => console.error(error))
    return center;
}
