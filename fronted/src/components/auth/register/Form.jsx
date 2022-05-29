import { Header } from "./Header";
import { LinksCookiePrivacy } from "./LinksCookiePrivacy";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Form = ({
  createUser,
}) => {
  const validation = Yup.object().shape({
    email: Yup.string().email().max(255).required("El email es requerido."),
    password: Yup.string().max(255).required("Se require una contraseña"),
    name: Yup.string().max(255).min(2).required("Se requiere un nombre"),
    surnames: Yup.string().max(255).min(2).required("Se requieren apellido(s)"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      surnames: "",
      email: "",
      password: "",
      rol: "/api/user_roles/3"
    },

    validationSchema: validation,
    onSubmit: async (values) => {
      console.log(values)
      createUser(values);
      formik.resetForm();
    },
  });

  return (
    <>
      <Header />
      <form className="mt-12" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">

          {/* Name */}
          <div className=''>
            <label
              htmlFor="firstName"
              className="block text-sm font-bold text-black"
            >
              Nombre
            </label>
            <div className="mt-1">
              <input
                {...formik.getFieldProps("name")}
                placeholder="Nombre"
                type="text"
                id="firstName"
                autoComplete="given-name"
                className="py-3 px-4 block w-full shadow-sm border-2 border-hardpurple-400 rounded-md leading-5 bg-fuchsia-100 bg-opacity-25 text-gray-800 font-bold placeholder-indigo-200 focus:outline-none focus:bg-slate-100 focus:ring-0 focus:placeholder-gray-400 focus:text-logo-500 sm:text-sm"

              />
              {formik.getFieldMeta("name").error
                && formik.getFieldMeta("name").touched
                && (
                  <div className='text-xs text-red-500'>
                    {formik.getFieldMeta("name").error}
                  </div>
                )
              }
            </div>
          </div>

          {/* Surname */}
          <div className=''>
            <label
              htmlFor="surnames"
              className="block text-sm font-bold text-black"
            >
              Apellidos
            </label>
            <div className="mt-1">
              <input
                {...formik.getFieldProps("surnames")}
                placeholder="Apellidos"
                type="text"
                id="lastName"
                autoComplete="given-surnames"
                className="py-3 px-4 block w-full shadow-sm border-2 border-hardpurple-400 rounded-md leading-5 bg-fuchsia-100 bg-opacity-25 text-gray-800 font-bold placeholder-indigo-200 focus:outline-none focus:bg-slate-100 focus:ring-0 focus:placeholder-gray-400 focus:text-logo-500 sm:text-sm"
              />
              {formik.getFieldMeta("surnames").error
                && formik.getFieldMeta("surnames").touched
                && (
                  <div className='text-xs text-red-500'>
                    {formik.getFieldMeta("surnames").error}
                  </div>
                )
              }
            </div>
          </div>

          {/* Email */}
          <div className='sm:col-span-2'>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-black"
            >
              Apellidos
            </label>
            <div className="mt-1">
              <input
                {...formik.getFieldProps("email")}
                placeholder="Email"
                type="text"
                id="email"
                autoComplete="given-surnames"
                className="py-3 px-4 block w-full shadow-sm border-2 border-hardpurple-400 rounded-md leading-5 bg-fuchsia-100 bg-opacity-25 text-gray-800 font-bold placeholder-indigo-200 focus:outline-none focus:bg-slate-100 focus:ring-0 focus:placeholder-gray-400 focus:text-logo-500 sm:text-sm"
              />
              {formik.getFieldMeta("email").error
                && formik.getFieldMeta("email").touched
                && (
                  <div className='text-xs text-red-500'>
                    {formik.getFieldMeta("email").error}
                  </div>
                )
              }
            </div>
          </div>

          {/* Password */}

          <div className='sm:col-span-2'>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-black"
            >
              Contraseña
            </label>
            <div className="mt-1">
              <input
                {...formik.getFieldProps("password")}
                placeholder="Contraseña"
                type="password"
                id="password"
                autoComplete="given-password"
                className="py-3 px-4 block w-full shadow-sm border-2 border-hardpurple-400 rounded-md leading-5 bg-fuchsia-100 bg-opacity-25 text-gray-800 font-bold placeholder-indigo-200 focus:outline-none focus:bg-slate-100 focus:ring-0 focus:placeholder-gray-400 focus:text-logo-500 sm:text-sm"
              />
              {formik.getFieldMeta("password").error
                && formik.getFieldMeta("password").touched
                && (
                  <div className='text-xs text-red-500'>
                    {formik.getFieldMeta("password").error}
                  </div>
                )
              }
            </div>
          </div>

          {/* Button submit and links */}
          <div className="sm:col-span-2">
            <button
              type="submit" id="btn-register"
              onClick={formik.handleSubmit}
              className="w-full inline-flex items-center justify-center px-6 py-2 ease-in-out duration-300 
              border border-transparent rounded-md shadow-sm text-lg font-medium text-white
               bg-hardpurple-400 hover:bg-hardpurple-500 text-shadow-lg "
            >
              Registrarse
            </button>
          </div>
          <LinksCookiePrivacy />
        </div>
      </form>
    </>
  );
};
