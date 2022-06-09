import { ClockOutline } from "heroicons-react";
import React, { useEffect, useMemo, useState } from "react";
import { Calendar } from "react-calendar";
import styled from "styled-components";
import { useInstallation } from "../../services/useInstallation";
import { EditHoursInstallation } from "./EditHoursInstallation";

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
    color: #ffb133;
  }
`;

export const RentTab = ({ center }) => {
  const {
    //getRentDates,
    getInstallation,
    getInstalationsSport,
  } = useInstallation();
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

  const [rentHoursSelected, setRentHoursSelected] = useState([]);

  //Dia actual (por defecto)
  const today = new Date();
  //Guarda el dia del calendario pulsado
  const [date, setDate] = useState(today.getDay());
  const [dateCalendar, setDateCalendar] = useState(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);

  //Guarda el id del deporte (option) seleccionado
  const [activeOption, setActiveOption] = useState(null);
  //Guarda el id de la instalacion (option) seleccionado
  const [activeOptionInstallation, setActiveOptionInstallation] =
    useState(null);

  const [installation, setInstallation] = useState(null);
  useEffect(() => {
    const callToGetCustomers = async () => {
      setInstallation(await getInstallation(activeOptionInstallation));
    };
    callToGetCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOptionInstallation]);

  const [installationsSport, setInstallationsSport] = useState([]);
  useEffect(() => {
    const callToGetCustomers = async () => {
      setInstallationsSport(
        await getInstalationsSport(center.id, activeOption)
      );
    };
    callToGetCustomers();
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

  const rentals = useMemo(() => 
    {
      if (installation) {
        return installation.rentals.filter(e => {
          const date = new Date(e.date);
          return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` === dateCalendar;
        })
      }

      return [];
    }
  , [installation, dateCalendar]);


  console.log(rentals)

  return (
    <>
      <EditHoursInstallation
        setIsOpenEditInstallation={setIsOpenEditInstallation}
        isOpenEditInstallation={isOpenEditInstallation}
        activeOptionInstallation={activeOptionInstallation}
      />
      <div>
        <div className="pt-6 w-10/12 mx-auto">
          <h1 className="text-center font-bold text-xl">Calendario</h1>
          <CalendarContainer>
            <Calendar
              onClickDay={(e) => {
                setDate(e.getDay());
                setDateCalendar(
                  `${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`
                );
              }}
            />
          </CalendarContainer>
          <div className="pt-6 w-10/12 mx-auto">
            <h3 className="text-center font-semibold text-base">Dia : {dateCalendar}</h3>
            <h1 className="text-center font-bold text-xl">SELECT DEPORTES</h1>
            {sports?.length > 0 ? (
              <select
                id="select-sports"
                className="mt-8 bg-white py-3 px-4 block w-full shadow-sm border-2 border-softblue-800 rounded-md"
              >
                <option
                  className="text-gray-500"
                  selected="selected"
                  onClick={() => setActiveOption()}
                  value={0}
                >
                  Todos los deportes
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

            <h1 className="text-center font-bold text-xl">SELECT PISTA</h1>
            {installationsSport.length > 0 ? (
              <select
                id="select-project"
                className="mt-8 bg-white py-3 px-4 block w-full shadow-sm border-2 border-softblue-800 rounded-md"
                placeholder="Seleccione proyecto"
              >
                <option className="text-gray-500" value={0}>
                  Selecciona la pista
                </option>
                {installationsSport.map((installation, idx) => (
                  <option
                    onClick={() => setActiveOptionInstallation(installation.id)}
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
            <h1 className="text-center font-bold text-xl">HORAS DISPONIBLES</h1>
            {installation && installation.schedure?.[days[date]]?.length > 0 ? (
              <div className="block">
                <div className="w-full gap-2 flex flex-col">
                  {installation.schedure[days[date]].map((section, idx) => (
                    <div
                      className={`px-4 py-2 gap-2 flex justify-between  rounded-xl ${
                        rentals.some(
                          (r) => r.schedure === section.id
                        )
                          ? "bg-hardorange-100"
                          : "bg-hardpurple-100"
                      }`}
                      key={`${section.id}-${idx}`}
                    >
                      <div className="gap-1 flex flex-col flex-grow justify-center items-start">
                        <div className="gap-1 flex items-center text-gray-900">
                          <span>
                            Deporte:{" "}
                            {sports?.find((s) => s.id === activeOption)?.name}
                          </span>
                        </div>
                        <div className="gap-1 flex items-center text-gray-900">
                          <span>
                            <ClockOutline className="h-5 w-5 mt-0.5" />
                          </span>
                          <span>Horario:</span>{" "}
                          <span>
                            {section.startAt} - {section.endAt}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center flex-none">
                        {installation.rentals.some(
                          (r) => r.schedure === section.id
                        ) ? (
                          <h3
                            className="px-4 py-1 bg-hardorange-400
                          text-white rounded-2xl"
                          >
                            Ocupado
                          </h3>
                        ) : (
                          <button
                            className={`px-4 py-1 bg-hardpurple-400 hover:bg-hardpurple-300
                        text-white rounded-2xl ${
                          rentHoursSelected.some((e) => e === section.id)
                            ? "ring ring-offset-2 ring-hardorange-400 bg-hardorange-200 hover:bg-hardorange-100 text-black"
                            : ""
                        }`}
                            key={`${section.id}-${idx}`}
                            onClick={() =>
                              setRentHoursSelected((selected) =>
                                selected.some((e) => e === section.id)
                                  ? selected.filter((e) => e !== section.id)
                                  : [...selected, section.id]
                              )
                            }
                          >
                            {rentHoursSelected.find((r) => r === section.id)
                              ? "Añadido"
                              : "Añadir"}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button className="mt-6 w-full bg-hardpurple-400 hover:bg-hardpurple-300 p-1 text-white rounded-2xl">
                    Alquilar
                  </button>
                  <button
                    className="mt-6 w-full bg-hardpurple-400 hover:bg-hardpurple-300 p-1 text-white rounded-2xl"
                    onClick={() => setIsOpenEditInstallation(true)}
                  >
                    Editar horas instalacion
                  </button>
                </div>
              </div>
            ) : (
              "No"
            )}
          </div>
        </div>
      </div>
    </>
  );
};
