import React from "react";
import { createRoot } from 'react-dom/client';
import  App  from "./App";
import AuthProvider from "./provider/AuthProvider";


const divRoot = document.getElementById('root');
const root = createRoot(divRoot);


root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
);
