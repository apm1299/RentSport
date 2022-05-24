import { NavLink } from "react-router-dom"

export const Header = () => {
    return (
        <>
            <div>
                <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-white.svg"
                    alt="Workflow"
                />
                <h2 className="mt-6 text-center text-4xl font-extrabold text-cyan-900">Forgot your password?</h2>
                <p className="mt-2 text-center text-sm text-cyan-900">
                    Or{' '}
                    <NavLink to='/login' className="font-medium text-white hover:text-cyan-900">you want to try again</NavLink>
                </p>
            </div>
        </>
    )
}