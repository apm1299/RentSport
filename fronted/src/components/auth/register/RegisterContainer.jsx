import { useUser } from "../../../services/useUser.jsx";
import { Form } from "./Form.jsx";

export const RegisterContainer = () => {
  const {
    createUser,
} = useUser()
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-hardpurple-400 via-hardpurple-200 to-hardpurple-400  py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
       
        <div className=" bg-gray-50 relative max-w-xl mx-auto p-8 border-8 border-hardpurple-400 rounded-3xl">
          <Form 
            createUser={createUser}
          />
        </div>

      </div>
    </>
  );
};
