import { NavLink } from "react-router-dom"

export const Header = () => {
    return (
        <>
            <div className="text-center">
                <h2 className="text-2xl font-extrabold tracking-tight text-logo-400 text-shadow-md sm:text-1xl">
                    Regístrate en nuestra aplicación web y empieza a hacer deporte
                </h2>
                <p className="mt-4 text-lg leading-6 text-black text-shadow-md">
                    Ingrese su información personal. Podrás consultar y cambiar la informacion mas adelante</p>
                <p class="mt-2 text-center text-sm text-black">
                    Si ya tiene una cuenta, vuelva a iniciar sesión {' '}
                    <NavLink to='/entrar' className="font-medium text-blue-500 hover:text-blue-700 underline">
                        Volver
                    </NavLink>
                </p>
            </div>
        </>
    )
}
