import React from "react";
import axios from "axios";
import { render, cleanup, waitForElement, fireEvent, getByText, getByTestId, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Lydia Miller-Jones")).toBeInTheDocument();
  });

  it("loads data, books an interview, and reduces the spots remaining for the first day by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(container, "Lydia Miller-Jones"));

    // 3. Get the first appointment node
    const appointment = getAllByTestId(container, "appointment")[0];

    // 4. Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));

    // 5. Enter text into the input field
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 6. Click an interviewer icon
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 7. Click the save button
    fireEvent.click(getByText(appointment, "Save"));

    // 8. Check that the 'saving' status view is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 9. Wait until the new appointment is displayed and check that the correct text is shown
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    // 10. Verify that the number of spots has changed
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(container, "Lydia Miller-Jones"));

    // 3. Click the "Cancel" button on the first booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Lydia Miller-Jones"));
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the element with the text "Confirm" is displayed.
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

    // 5. Click the "Confirm" button.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Check that the element with the alt text "Add" is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    expect(getByAltText(appointment, "Add")).toBeInTheDocument();

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(container, "Lydia Miller-Jones"));

    // 3. Click the "Edit" button on the first booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Lydia Miller-Jones"));
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Check that the element with the text "Save" is displayed.
    expect(getByText(appointment, "Save")).toBeInTheDocument();

    // 5. Change the input value to "Allen"
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "Allen" }
    });

    // 6. Click the "Save" button.
    fireEvent.click(queryByText(appointment, "Save"));

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8. Check that the element with the text "Allen" is displayed.
    await waitForElement(() => getByAltText(appointment, "Edit"));
    expect(getByText(appointment, "Allen")).toBeInTheDocument();

    // 9. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(container, "Lydia Miller-Jones"));

    // 3. Click the "Edit" button on the first booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Lydia Miller-Jones"));
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Check that the element with the text "Save" is displayed.
    expect(getByText(appointment, "Save")).toBeInTheDocument();

    // 5. Change the input value to "Allen"
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "Allen" }
    });

    // 6. Click the "Save" button.
    fireEvent.click(queryByText(appointment, "Save"));

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8. Check that the element with the text "Error" is displayed.
    await waitForElement(() => getByAltText(appointment, "Close"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(container, "Lydia Miller-Jones"));

    // 3. Click the "Cancel" button on the first booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Lydia Miller-Jones"));
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the element with the text "Confirm" is displayed.
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

    // 5. Click the "Confirm" button.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Check that the element with the text "Error" is displayed.
    await waitForElement(() => getByAltText(appointment, "Close"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();
  });

});
