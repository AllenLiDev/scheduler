export function getAppointmentsForDay(state, day) {
  const matchedDay = state.days.filter(currentDay => currentDay.name === day);
  return (matchedDay.length === 0 ? [] : matchedDay[0].appointments.map(appointmentID => state.appointments[appointmentID]));
}
