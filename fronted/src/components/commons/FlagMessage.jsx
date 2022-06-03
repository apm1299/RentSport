import React from 'react'
import { Message } from "rsuite";
import toaster from "rsuite/toaster";


export const FlagMessage = () => {

    const showMessageSucess = () => {
        toaster.push(
            <Message
                className='p-3 bg-gradient-to-l from-hardpurple-300 to-lime-200 w-72 fixed right-2 top-20 rounded  shadow-2xl text-xl italic font-medium animate-fade-in-down'
                type={"success"}
                duration={3500}
                showIcon
            >
                Datos guardados
            </Message>,
            { placement: "topEnd" }
        );
    };
    const showMessageError = () => {
        toaster.push(
            <Message
            className='p-3 bg-gradient-to-l from-hardpurple-300 via-to-logo-400 to-logo-500 w-72 fixed right-2 top-20 rounded  shadow-2xl text-xl italic font-medium animate-fade-in-down'
            type={"error"}
                duration={3500}
                showIcon
            >
                Algo ha salido mal
            </Message>,
            { placement: "topEnd" }
        );
    };
    
    return {
        showMessageSucess,
        showMessageError,
    }
}
