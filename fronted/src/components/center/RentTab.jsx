import { ClockOutline } from "heroicons-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar } from "react-calendar";
import styled from "styled-components";
import { useAuth } from "../../services/useAuth";
import { useInstallation } from "../../services/useInstallation";
import { useUser } from "../../services/useUser";
import { FlagMessage } from "../commons/FlagMessage";
import { EditInstallation } from "./EditInstallation";
import { PaymentModal } from "./PaymentModal";

const CalendarContainer = styled.div`
  /* ~~~ container styles ~~~ */
  max-width: 95%;
  margin: auto;
  margin-top: 20px;
  padding: 10px;
  border-radius: 3px;
  /* ~~~ navigation styles ~~~ */
  .react-calendar__navigation {
    display: flex;

    .react-calendar__navigation__label {
      font-weight: bold;
    }

    .react-calendar__navigation__arrow {
      flex-grow: 0.433;
    }
  }
  /* ~~~ label styles ~~~ */
  .react-calendar__month-view__weekdays {
    text-align: center;
  }
  /* ~~~ button styles ~~~ */
  button {
    margin: 3px;
    background-color: #50336b;
    border: 0;
    font-weight: bold;
    border-radius: 22px;
    color: #ffb133;
    padding: 5px 0;

    &:hover {
      background-color: #7c6690;
      color: #ff9e00;
    }

    &:active {
      background-color: #ffb133;
      color: #50336b;
    }
    button:focus {
      background-color: #ffb133;
      color: #50336b;
    }
  }
  /* ~~~ day grid styles ~~~ */
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;

    .react-calendar__tile {
      max-width: initial !important;
    }
  }
  /* ~~~ active day styles ~~~ */
  .react-calendar__tile--range {
    box-shadow: 0 0 14px 2px black;
    background-color: #ffb133;
    color: #50336b;
  }

  /* ~~~ neighboring month & weekend styles ~~~ */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.6;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #fffff;
  }
`;

export const RentTab = ({ center }) => {
  const { getInstallation, getInstalationsSport } = useInstallation();
  const { showMessageSucess, showMessageError } = FlagMessage()
  const { user } = useAuth();
  const { userLoggedIn } = useUser();

  const month = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const days = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
  ];
  const [isOpenEditInstallation, setIsOpenEditInstallation] = useState(false);
  const [isOpenPayment, setIsOpenPayment] = useState(false);

  const [rentHoursSelected, setRentHoursSelected] = useState([]);

  //Dia actual (por defecto)
  const today = new Date();
  //Guarda el dia del calendario pulsado
  const [date, setDate] = useState(today.getDay());
  const [dateCalendar, setDateCalendar] = useState(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);

  //Guarda el id del deporte (option) seleccionado
  const [activeOption, setActiveOption] = useState(null);
  //Guarda el id de la instalacion (option) seleccionado
  const [activeOptionInstallation, setActiveOptionInstallation] = useState(null);

  const [installation, setInstallation] = useState(null);
  useEffect(() => {
    const callToGetInstallation = async () => {
      setInstallation(await getInstallation(activeOptionInstallation.id));
    };
    callToGetInstallation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOptionInstallation]);

  const [installationsSport, setInstallationsSport] = useState([]);
  useEffect(() => {
    const callToGetSport = async () => {
      setInstallationsSport(
        await getInstalationsSport(center.id, activeOption)
      );
    };
    callToGetSport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOption]);

  //COMPRUEBA QUE ME DEVUELVA UN ARRAY, EN EL CASO DE DEVOLVERME OBJETO LO CONVIERTE EN ARRAY
  const sports = useMemo(() => {
    if (center.sports) {
      return typeof center.sports === "object"
        ? Object.keys(center.sports).map((key) => center.sports[key])
        : center.sports;
    }
    return [];
  }, [center.sports]);


  const rentals = useMemo(() => {
    if (installation) {
      return installation.rentals.filter(e => {
        const date = new Date(e.date);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` === dateCalendar;
      })
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [installation, dateCalendar]);

  const EditView = useCallback(() =>
    <EditInstallation
      key={installation.id}
      setIsOpenEditInstallation={setIsOpenEditInstallation}
      isOpenEditInstallation={isOpenEditInstallation}
      installation={installation}
      center={center}
      setInstallation={setInstallation}
    />, [installation, center, setInstallation, isOpenEditInstallation, setIsOpenEditInstallation])

  return (
    <>
      {
        installation && rentHoursSelected &&
        EditView()
      }
      {
        activeOptionInstallation && userLoggedIn &&
        <PaymentModal
          isOpenPayment={isOpenPayment}
          setIsOpenPayment={setIsOpenPayment}
          rentHoursSelected={rentHoursSelected}
          activeOptionInstallation={activeOptionInstallation}
          dateCalendar={dateCalendar}
          sports={sports}
          activeOption={activeOption}
          userLoggedIn={userLoggedIn}
          setRentHoursSelected={setRentHoursSelected}
          rentals={rentals}
          center={center}
        />
      }
      <div>
        <div className="pt-6 w-10/12 mx-auto pb-12">
          <div className="border-2 border-hardpurple-100 shadow-xl py-4 rounded-xl">
            <h1 className="text-center font-bold text-xl">Calendario</h1>
            <CalendarContainer>
              <Calendar
                onClickDay={(e) => {
                  //Comparar que el dia se??alado sea mayor al actual
                  if (new Date(`${today.getFullYear()} ${today.getMonth() + 1} ${today.getDate()}`) <= new Date(`${e.getFullYear()} ${e.getMonth() + 1} ${e.getDate()}`)) {
                    //  ${today.getDate()})(`${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`) <= `${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`) {
                    setDate(e.getDay());
                    setDateCalendar(
                      `${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`
                    );
                  } else {
                    showMessageError("Fecha no valida");
                  }
                }}
              />
              <div className="shadow-2xl border-t" />
            </CalendarContainer>
            <h2 className="text-center font-semibold text-xl m-4">Dia para la reserva</h2>
            <h2 className="text-center font-semibold text-xl mb-4">
              {
                isNaN(dateCalendar.substr(5, 2)) ? (
                  `${dateCalendar.substr(7, 2)} de ${month[Number(dateCalendar.substr(5, 1)) - 1]} del ${dateCalendar.substr(0, 4)}`
                ) : (
                  `${dateCalendar.substr(8, 2)} de ${month[Number(dateCalendar.substr(5, 2)) - 1]} del ${dateCalendar.substr(0, 4)}`
                )
              }
            </h2>
          </div>
          <div className="pt-10 w-10/12 mx-auto">
            <h2 className="font-semibold text-lg ">Deportes disponibles</h2>
            {sports?.length > 0 ? (
              <select
                id="select-sports"
                className=" bg-white py-3 px-4 block w-full shadow-sm border-2 border-softblue-800 rounded-md"
              >
                <option
                  className="text-gray-500"
                  selected="selected"
                  onClick={() => setActiveOption()}
                  value={0}
                >
                  Selecciona un deporte
                </option>
                {sports.map((sport, idx) => (
                  <option
                    onClick={() => setActiveOption(sport.id)}
                    key={`${sport.name}-${idx}`}
                    value={sport.id}
                  >
                    {sport.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="bg-white py-3 px-4 block w-full shadow-sm border-2 border-softblue-800 rounded-md">
                <p>Sin deportes asignados</p>
              </div>
            )}
          </div>
          <div className="pt-6 w-10/12 mx-auto">

            <h1 className="font-semibold text-lg">Pistas disponibles</h1>
            {installationsSport.length > 0 ? (
              <select
                id="select-project"
                className=" bg-white py-3 px-4 block w-full shadow-sm border-2 border-softblue-800 rounded-md"
                placeholder="Seleccione proyecto"
              >
                <option className="text-gray-500" value={0}>
                  Selecciona la pista
                </option>
                {installationsSport.map((installation, idx) => (
                  <option
                    onClick={() => setActiveOptionInstallation(installation)}
                    key={`${installation.name}-${idx}`}
                    value={installation?.["@id"]}
                  >
                    {installation.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="bg-white py-3 px-4 block w-full shadow-sm border-2 border-softblue-800 rounded-md">
                <p>No hay ninguna pista disponible</p>
              </div>
            )}
          </div>
          <div className="pt-6 w-10/12 mx-auto">
            <h1 className="font-semibold text-xl">{activeOptionInstallation ? `Horas de ${activeOptionInstallation.name}` : ''}</h1>
            {installation && installation.schedule?.[days[date]]?.length > 0 ? (
              <div className="block">
                <div className="w-full gap-2 flex flex-col ">
                  {installation.schedule[days[date]].map((section, idx) => (

                    <div
                      className={`h-28 sm:h-28  px-4 py-1 gap-2 block sm:flex justify-between rounded-xl shadow-lg ease-linear duration-300 ${rentals.some(
                        (r) => r.schedule === section.id
                      )
                        ? "bg-hardorange-100"
                        : "bg-hardpurple-100"
                        }`}

                      key={`${section.id}-${idx}`}
                    >
                      <div className="gap-1 flex flex-col flex-grow justify-center items-start">
                        <div className="gap-1 flex items-center text-gray-900">
                          <span>

                            {
                              ((rentals.some((r) => r.schedule === section.id) && (center.userAdmin['id'] === user.id)) ||
                                (rentals.some((r) => r.schedule === section.id) && user && user.roles.find((r) => r === "ROLE_SUPERADMIN"))) ? (
                                <span>
                                  {rentals.map((rent, idx) => (
                                    section && rent.schedule === section.id && (
                                      `Deporte: ${rent.sport.name}`
                                    )
                                  ))}
                                </span>
                              ) : (
                                <span>
                                  Deporte seleccionado: {sports?.find((s) => s.id === activeOption)?.name}
                                </span>
                              )
                            }
                          </span>
                        </div>
                        <div className="gap-1 flex items-center text-gray-900">
                          <div className="block">
                            <div className="gap-1 flex ">
                              <span>
                                <ClockOutline className="h-5 w-5 mt-0.5" />
                              </span>
                              {" "}
                              <span>
                                {section.startAt} - {section.endAt}
                              </span>
                            </div>
                            <div>
                              {
                                ((rentals.some((r) => r.schedule === section.id) && (center.userAdmin['id'] === user.id)) ||
                                  (rentals.some((r) => r.schedule === section.id) && user && user.roles.find((r) => r === "ROLE_SUPERADMIN"))) ? (
                                  <span>
                                    {rentals.map((rent, idx) => (
                                      section && rent.schedule === section.id && (
                                        `${rent.lessor.name}  ${rent.lessor.surnames}`
                                      )
                                    ))}
                                  </span>
                                ) : (
                                  <span>
                                    Precio: {installation.pricePerRange}???
                                  </span>
                                )
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center flex-none">
                        {rentals.some(
                          (r) => r.schedule === section.id
                        ) ? (
                          <button
                            disabled
                            className="px-4 py-1 bg-hardorange-400
                          text-white rounded-2xl"
                          >
                            Ocupado
                          </button>
                        ) : (
                          <button
                            className={`px-6 py-1 bg-hardpurple-400 hover:bg-hardpurple-300
                        text-white rounded-2xl ${rentHoursSelected.some((e) => e === section)
                                ? "ring ring-offset-2 ring-hardorange-400 bg-hardorange-200 hover:bg-hardorange-100 text-black"
                                : ""
                              }`}
                            key={`${section.id}-${idx}`}
                            onClick={() =>
                              setRentHoursSelected((selected) =>
                                selected.some((e) => e === section)
                                  ? selected.filter((e) => e !== section)
                                  : [...selected, section]
                              )
                            }
                          >
                            {rentHoursSelected.find((r) => r === section)
                              ? "A??adido"
                              : "A??adir"}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button className="mt-6 w-full bg-hardpurple-400 hover:bg-hardpurple-300 p-1 text-white rounded-2xl"
                    onClick={() => rentHoursSelected.length > 0 && setIsOpenPayment(true)}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            ) : installation && installation.schedule?.[days[date]]?.length <= 0 && (
              <div className=" px-4 py-4 gap-2 block sm:flex justify-between rounded-xl shadow-lg ease-linear duration-300 bg-hardpurple-100">
                <p className="font-medium text-base">No disponible este dia</p>
              </div>
            )}
          </div>
          <div className="w-10/12 mx-auto">
            {((installation && center.userAdmin['id'] === user.id) ||
              (installation && user && user.roles.find((r) => r === "ROLE_SUPERADMIN"))) && (
                <button
                  className="mt-6 w-full bg-hardpurple-400 hover:bg-hardpurple-300 p-1 text-white rounded-2xl"
                  onClick={() => setIsOpenEditInstallation(true)}
                >
                  Editar instalacion
                </button>
              )}
          </div>

        </div>
      </div>
    </>
  );
};
