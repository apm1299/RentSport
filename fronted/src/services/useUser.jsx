
export const useUser = () => {

// const headers = new Headers();
// headers.set("Accept", "application/ld+json");
// headers.set("Content-Type", "application/ld+json");

// await fetch("http://localhost:8000/api/users", {
//   method: "POST",
//   headers,
//   credentials: "include",
//   body: JSON.stringify(values, null, 2),
// })
//   .then((response) => response.json())
//   .then((retrieved) => {
//     console.log(retrieved);
//   })
//   .catch((error) => console.error(error));
// console.log("Formulario enviado!");
// window.location.pathname='/';

    //Crear Usuario
    async function createUser(values) {

        const headers = new Headers();
        headers.set("Accept", "application/ld+json");
        headers.set("Content-Type", "application/ld+json")

        await fetch('http://localhost:8000/api/users', {
            method: 'POST',
            headers,
            credentials: 'include',
            body: JSON.stringify(values, null, 2),
        }).then(response => response.json()
            .then(retrieved => {
            //window.location.pathname='/';
            }))
            .catch(error => console.error(error))
    }

    return {
        createUser,
    }
}