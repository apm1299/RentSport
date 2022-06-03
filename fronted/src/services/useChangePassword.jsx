import { useState } from "react";

export const useChangePassword = () => {
    const [isOpenEnterUserPasswordModal, setIsOpenEnterUserPasswordModal] = useState(false);

    //Actualizar contraseña
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
        isOpenEnterUserPasswordModal,
        setIsOpenEnterUserPasswordModal,
        updateUser,
    }
}