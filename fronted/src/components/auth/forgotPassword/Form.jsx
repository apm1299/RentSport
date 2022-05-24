import { InputEmail } from "./InputEmail";
import { ButtonSubmit } from "./ButtonSubmit";

export const Form = () => {
    return (
        <>
            <form className="mt-8 space-y-6" action="#" method="POST">
                <InputEmail />
                <ButtonSubmit />
            </form>
        </>
    )
}