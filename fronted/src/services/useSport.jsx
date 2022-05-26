export async function getSports(search='') {

    let sports = [];
    let headers = new Headers();
    headers.set("Accept", "application/ld+json");
    headers.set("Content-Type", "application/ld+json")
    await global.fetch(`http://localhost:8000/api/sports${search ? `?name=${search}` : ''}`, {
        method: 'GET',
        headers,
        credentials: 'include',
    }).then(response => response.json()
    .then(async retrieved => {
        sports = await retrieved['hydra:member'];
        console.log(retrieved);
    }))
    .catch(error => console.error(error))

    return sports;
}