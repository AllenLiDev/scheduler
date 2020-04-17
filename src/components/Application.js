import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "../helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all(
      [
        axios.get("/api/days"),
        axios.get("/api/appointments")
      ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data }))
      })
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);
  const appointmentList = appointments.map(appointment => {
    return (
      <Appointment key={appointment.id} {...appointment} />
    );
  });

  appointmentList.push(<Appointment key="last" time="7pm" />);

  return (
    <main className="layout">
      <section className="sidebar">
        <DayList
          days={state.days}
          day={state.day}
          setDay={day => setDay(day)}
        />
      </section>
      <section className="schedule">
        {appointmentList}
      </section>
    </main>
  );
}
