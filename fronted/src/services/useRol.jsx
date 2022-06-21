
export const useRol = () => {

    async function addUserRolAdmin(id) {
        let data = {userRoles: ['/api/user_roles/2']};
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
        addUserRolAdmin
    }
}