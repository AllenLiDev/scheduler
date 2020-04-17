import React, { useState, useEffect } from "react";
import Axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";



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
  const [days, setDays] = useState([]);
  const [day, setDay] = useState("Monday");
  useEffect(() => {
    axios.get("/api/days")
      .then(res => {
        setDays(res.data);
      })
      .catch(error => console.log(error.res));
  }, []);
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
