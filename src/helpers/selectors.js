export function getAppointmentsForDay(state, day) {
  const matchedDay = state.days.filter(currentDay => currentDay.name === day);
  return (matchedDay.length === 0 ? [] : matchedDay[0].appointments.map(appointmentID => state.appointments[appointmentID]));
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  for (const interviewer in state.interviewers) {
    if (state.interviewers[interviewer].id === interview.interviewer) {
      return { student: interview.student, interviewer: state.interviewers[interviewer] }
    }
  }
}
