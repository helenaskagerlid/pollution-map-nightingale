# Pollution Map Project

A full-stack application that displays pollution data on an interactive map. This project has a **frontend** built with React and Leaflet and a **backend** built with Express.js, with data stored in a MySQL database.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Technologies](#technologies)
3. [Features](#features)
4. [Installation](#installation)
5. [Database Setup](#database-setup)
6. [Running the Application](#running-the-application)
7. [Components Overview](#components-overview)
8. [API Endpoints](#api-endpoints)
9. [Styling](#styling)

---

## Project Structure

project-root/
├── Client/
│   ├── public/
│   │   ├── nightingalelogo.svg
│   ├── src/
│   │   ├── assets/
│   │   │   ├── backgroundImg.png
│   │   │   ├── grade4.png
│   │   │   ├── pollutionguide3.png
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   ├── pages/
│   │   │   ├── Layout.tsx
│   │   │   ├── PollutionMapTest.tsx
│   │   ├── models/
│   │   │   ├── IPlaces.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── router.tsx
│   ├── index.html
│   ├── package.json

├── Server/
│   ├── lib/
│   │   └── conn.js
│   ├── routes/
│   │   ├── index.js
│   │   └── users.js
│   ├── app.js
│   ├── package.json
└── README.md


---

## Technologies

**Frontend:** React, TypeScript, React-Leaflet, Axios, CSS
**Backend:** Express.js, MySQL
**Database:** MySQL (with MAMP as a local server)

---

## Features
**Pollution Data Visualization:** Pollution data points displayed on a map.
**Locate Nearest Measurement Point:** Centers the map on the user's nearest pollution data point.
**Full-Stack Integration:** Data stored in MySQL and served through an Express API.
**Filtering and Search Options:** The user can filter and search for specific pollution levels or locations.

---

## Installation
##### Clone the Repository:

- git clone <repo_url>

##### Install Dependencies for Client:

- cd Client
- npm install

##### Install Dependencies for Server:

- cd ../Server
- npm install

---

## Database Setup

Open MAMP and start MySQL servers.

##### Create Database in phpMyAdmin:

**Database name:** nightingale2

**Table structure:**
CREATE TABLE nightingale2 (
  country VARCHAR(128),
  date VARCHAR(128) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  value FLOAT NOT NULL
);

**Configure Database Connection in Server/lib/conn.js:**

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'nightingale2',
    password: 'nightingale2',
    database: 'nightingale2'
});

module.exports = connection;

---

## Running the Application
#### Start Backend Server:

**In a new terminal window:**
- cd Server
- nodemon start

#### Start Frontend Development Server:

**Open another terminal window:**
- cd Client
- npm run dev

#### Access the Application:

Open a browser and go to http://localhost:3000 for the backend and http://localhost:5173 for the frontend.

---

## Components Overview
1. **PollutionMapTest Component**
- Displays pollution data on an interactive map using React-Leaflet.
- Fetches pollution data via axios from the /nightingale2 endpoint.
- Includes a button that finds and centers on the nearest measurement point to the user.
2. **Header Component**
A navigation bar allowing users to access different parts of the application, including Home, About, and the Pollution Map.
3. **Layout Component**
Wraps the main content and includes the Header and Outlet components for routing.

---

## API Endpoints
**GET /nightingale2**
Fetches pollution data from the nightingale2 table in MySQL.
Example Response:
[
  {
    "country": "CountryName",
    "date": "2023-01-01",
    "latitude": 40.7128,
    "longitude": -74.006,
    "value": 15.2
  },
  ...
]

---

## Styling
**Fonts:** Uses Google Fonts (Inria Sans and Inria Serif).
**Color Scheme:** Light theme with specific color indicators for pollution levels based on PM2.5 values.