import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
      })
  }, []);

  const setDay = day => setState({ ...state, day });


  function bookInterview(id, interview) {
    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };
    const spotChange = (state.appointments[id].interview === null && interview !== null) ? -1 : 0;

    const currentDay = state.days.filter(day => day.appointments.includes(id))[0];
    const newDay = { ...currentDay, spots: currentDay.spots + spotChange };
    const newDays = state.days.map(day => (day.id === newDay.id ? newDay : day));

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...state, appointments, days: newDays });
      });
  }


  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };

    const currentDay = state.days.filter(day => day.appointments.includes(id))[0];
    const newDay = { ...currentDay, spots: currentDay.spots + 1 };
    const newDays = state.days.map(day => (day.id === newDay.id ? newDay : day));

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...state, appointments, days: newDays });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
