import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all(
      [
        axios.get("/api/days"),
        axios.get("/api/appointments"),
        axios.get("/api/interviewers")
      ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
      })
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);
  const appointmentList = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview} />
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
