import { useEffect, useState } from "react";

export const useUser = () => {
    //const [userLogin, setUserLogin] = useState([]);
    const [userLoggedIn, setUserLoggedIn] = useState([]);

    useEffect(() => {
        const callToGetUserLoggedIn = async () => {
            setUserLoggedIn(await getUserLoggedIn(1));
        }
        callToGetUserLoggedIn();
    }, []);

    //Usuario Logueado
    async function getUserLoggedIn(id) {
        let user = [];
        let headers = new Headers();
        headers.set("Accept", "application/ld+json");
        headers.set("Content-Type", "application/ld+json")
        await global.fetch(`http://localhost:8000/api/users/${id}`, {
            method: 'GET',
            headers,
            credentials: 'include',
        }).then(response => response.json()
            .then(async retrieved => {
                user = await retrieved;
            }))
            .catch(error => console.error(error))

        return user;
    }

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
            window.location.pathname='/entrar';
            }))
            .catch(error => console.error(error))
    }

        //Actualizar Usuario
        async function updateUser(id, values) {
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
        createUser,
        updateUser,
        userLoggedIn,
        setUserLoggedIn,
    }
}