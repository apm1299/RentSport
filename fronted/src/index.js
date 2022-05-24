import React from "react";
import { createRoot } from 'react-dom/client';
import  App  from "./App";


const divRoot = document.getElementById('root');
const root = createRoot(divRoot);

root.render(<App />);
