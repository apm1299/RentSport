import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import useDebounce from "./useDebounce";

export const useUser = () => {
    //const [userLogin, setUserLogin] = useState([]);
    const [userLoggedIn, setUserLoggedIn] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [searchUser, setSearchUser] = useState("");
    const debounce = useDebounce(searchUser, 400);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            setLoading(true);
            const callToGetUserLoggedIn = async () => {
                setUserLoggedIn(await getUserLoggedIn(user.id));
                setLoading(false);
            }
            callToGetUserLoggedIn();
        }
    }, [user]);

    useEffect(() => {
          const callToGetWorkers = async () => {
            setUsers(await getUsers());
          };
          callToGetWorkers();
      }, []);
    
      useEffect(() => {
          if (debounce !== undefined) {
            const callToGetWorkers = async () => {
                setUsers(await getUsers(debounce));
            };
            callToGetWorkers();
          }
      }, [debounce]);

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

    //Coger usuarios
    async function getUsers(search = "") {
        let users = [];
        let headers = new Headers();
        headers.set("Accept", "application/ld+json");
        headers.set("Content-Type", "application/ld+json");
        await global
          .fetch(
            `http://localhost:8000/api/users${search ? `?search=${search}` : ""}`,
            {
              method: "GET",
              headers,
              credentials: "include",
            }
          )
          .then((response) =>
            response.json().then(async (retrieved) => {
              users = await retrieved["hydra:member"];
              console.log(retrieved);
            })
          )
          .catch((error) => console.error(error));
    
        return users;
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
                window.location.pathname = '/entrar';
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

    async function getUserRent(section){
        let user = [];
        let headers = new Headers();
        headers.set("Accept", "application/ld+json");
        headers.set("Content-Type", "application/ld+json")
        await global.fetch(`http://localhost:8000/api/rentals?schedule=${section.id}`, {
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

    return {
        createUser,
        updateUser,
        userLoggedIn,
        setUserLoggedIn,
        isLoading,
        users,
        setSearchUser,
        getUserRent
    }
}