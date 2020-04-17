import React, { useState } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
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
          days={days}
          day={day}
          setDay={day => setDay(day)}
        />
      </section>
      <section className="schedule">
        {appointmentList}
      </section>
    </main>
  );
}
