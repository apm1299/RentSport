import { Form } from "./Form"
import { Header } from "./Header"

export const ForgotPasswordContainer = () => {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-cyan-600 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <Header />
                    <div className="max-w-md w-full space-y-8">
                        <Form />
                    </div>
                </div>
            </div>
        </>
    )
}