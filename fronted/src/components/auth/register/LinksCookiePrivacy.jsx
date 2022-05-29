import { NavLink } from "react-router-dom"

export const LinksCookiePrivacy = () => {
    return (
        <>
            <div className="sm:col-span-2">
                <div className="flex items-start">
                    <div className="ml-3">
                        <p className="text-base text-back">
                            Al registrarte, aceptas la{' '}
                            <NavLink to='/privacyPolicy' className="font-medium text-hardpurple-400 hover:text-hardpurple-500 underline">
                                Política de privacidad
                            </NavLink>{' '}

                            y{' '}
                            <NavLink to='/cookiePolicy' className="font-medium text-hardpurple-400 hover:text-hardpurple-500 underline">
                                Política de cookies
                            </NavLink>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
