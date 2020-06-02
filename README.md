# Interview Scheduler

A single page application (SPA) built using React.

Users can book, cancel appointments filtered by day of week and time slots.

Technologies used: React, Storybook, Jest, Cypress, and Axios.

## Setup

1. Install dependencies with `npm install`.

2. Fork and clone the [Scheduler API](https://github.com/lighthouse-labs/scheduler-api) and follow the instructions to setup the database API. PostgreSQL is required for this.

3. Run ```npm start``` in the scheduler-api directory to start the database server.

4. In another terminal, run ```npm start``` in the scheduler directory to start the webpack development server.

## Screenshots
### App Overview
!["Overview"](https://github.com/AllenLiDev/scheduler/blob/master/screenshots/App.png?raw=true)
### Appointment Card
!["Appointment Card"](https://github.com/AllenLiDev/scheduler/blob/master/screenshots/Appointment.png?raw=true)
### Booking / Editing an Appointment
!["Booking an Appointment"](https://github.com/AllenLiDev/scheduler/blob/master/screenshots/Create.png?raw=true)
### Cancelling an Appointment
!["Cancelling an Appointment"](https://github.com/AllenLiDev/scheduler/blob/master/screenshots/Delete.png?raw=true)


## Running Jest Test Framework
Jest was used to facilitate unit testing and integration testing.

```sh
npm test
```

## Running Cypress Test Framework
Cypress was used to facilitate end-to-end testing.

```sh
npm run cypress
```

## Running Storybook Visual Testbed
Storybook was used to build and test individual React components.
```sh
npm run storybook
```

## Dependencies

- Axios
- Classnames
- Normalize.css
- React
- React-dom
- React-hooks testing library
- React-scripts
- Node