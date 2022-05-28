// import { useState } from "react";


// export const useInstallation = () => {
//     const [installations, setInstallations] = useState([]);


//     async function getInstallationsCenter(idCenter) {

//         let centers = [];
//         let headers = new Headers();
//         headers.set("Accept", "application/ld+json");
//         headers.set("Content-Type", "application/ld+json")
//         await global.fetch(`http://localhost:8000/api/installations/${idCenter}/center/installations`, {
//             method: 'GET',
//             headers,
//             credentials: 'include',
//         }).then(response => response.json()
//             .then(async retrieved => {
//                 centers = await retrieved['hydra:member'];
//                 console.log(retrieved);
//             }))
//             .catch(error => console.error(error))

//         return centers;
//     }


//     return {
//         getInstallationsCenter,
//         setInstallations,
//         installations,
//     }
// }