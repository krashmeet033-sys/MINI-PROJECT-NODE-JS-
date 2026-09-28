# Express.js — Event Registration Using JSON File

## Student Details

**Name:** Rashmeet Kaur Nanade 

**Roll Number:** 150096725165 

**Course:** B.Tech CSE

**Subject:** Backend Development

**Assignment:** MINI PROJECT NODE JS 

---

## 1. Introduction

This assignment demonstrates how to create an **Event Registration API using Express.js and a JSON file**.

The application provides APIs to:

* Register a participant for an event
* Store registration data permanently in a JSON file
* Retrieve all registered participants
* Prevent duplicate registration for the same email and event
* Allow the same email to register for different events

---

## 2. Objective

The main objectives of this assignment are:

* To create an Express.js application.
* To handle POST requests using Express.js.
* To use the File System (`fs`) module for storing data.
* To read and write registration data from a JSON file.
* To parse JSON data using `JSON.parse()`.
* To convert data into JSON using `JSON.stringify()`.
* To generate a unique ID for each registration.
* To validate required fields.
* To prevent duplicate registrations for the same event.
* To allow the same email to register for different events.
* To test the APIs using Thunder Client.

---

## 3. Folder Structure

The project is organized into separate files for managing the Express.js application.

**Folder Structure:**

```text
q10-event-registration/
│
├── index.js
├── registrations.json
├── package.json
├── package-lock.json
├── README.md
└── screenshots/
    ├── post-success.png
    ├── get-registrations.png
    └── duplicate-registration.png
```

The `registrations.json` file is used to permanently store all event registrations.

---

## 4. Technologies Used

* **Node.js**
* **Express.js**
* **JavaScript**
* **File System (fs)**
* **JSON**
* **Thunder Client**

---

## 5. JSON File

The registration data is stored in:

```text
registrations.json
```

Initially, the file contains:

```json
[]
```

Whenever a new participant registers, the registration is added to the JSON file without deleting the previous registrations.

Example:

```json
[
  {
    "id": 1,
    "participantName": "Priya",
    "email": "priya@gmail.com",
    "eventName": "Code Sprint"
  },
  {
    "id": 2,
    "participantName": "Priya",
    "email": "priya@gmail.com",
    "eventName": "Hackathon"
  }
]
```

---

## 6. POST Registration API

A POST API is used to register a participant for an event.

### API

```text
POST http://localhost:2000/registrations
```

### Request Body

```json
{
  "participantName": "Priya",
  "email": "priya@gmail.com",
  "eventName": "Code Sprint"
}
```

### Successful Response

**Status: 201 Created**

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "id": 1,
    "participantName": "Priya",
    "email": "priya@gmail.com",
    "eventName": "Code Sprint"
  }
}
```

A unique numeric ID is automatically generated for every new registration.

---

## 7. Registration Validation

The API checks whether all required fields are provided.

The required fields are:

* `participantName`
* `email`
* `eventName`

If any field is missing, the API returns:

**Status: 400 Bad Request**

```json
{
  "success": false,
  "message": "All fields are required"
}
```

---

## 8. Duplicate Registration

The API prevents the same email from registering for the same event more than once.

For example, if the following registration already exists:

```text
Email: priya@gmail.com
Event: Code Sprint
```

Sending the same registration again returns:

**Status: 409 Conflict**

```json
{
  "success": false,
  "message": "Already registered for this event"
}
```

The same email can still register for a different event.

For example:

```text
priya@gmail.com + Code Sprint → Already registered

priya@gmail.com + Hackathon → Registration successful
```

---

## 9. GET Registrations API

A GET API is used to retrieve all registered participants.

### API

```text
GET http://localhost:2000/registrations
```

### Response

The API returns the total number of registrations along with all registration data.

Example:

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "participantName": "Priya",
      "email": "priya@gmail.com",
      "eventName": "Code Sprint"
    },
    {
      "id": 2,
      "participantName": "Priya",
      "email": "priya@gmail.com",
      "eventName": "Hackathon"
    }
  ]
}
```

The `count` represents the total number of registrations stored in the JSON file.

---

## 10. File System Operations

The Node.js File System (`fs`) module is used to manage the registration data.

The application uses:

### `fs.readFile()`

Used to read the existing registrations from `registrations.json`.

### `JSON.parse()`

Used to convert the JSON file data into a JavaScript array.

### `JSON.stringify()`

Used to convert the updated registration array back into JSON format.

### `fs.writeFile()`

Used to save the updated registrations permanently into `registrations.json`.

---

## 11. Data Persistence

The registrations are stored permanently in the `registrations.json` file.

The application does not use a database.

After adding registrations, the server can be stopped and restarted. The previously stored registrations remain available because they are saved in the JSON file.

---

## 12. How to Run the Project

Open the terminal and move to the project folder:

```bash
cd q10-event-registration
```

Install the required package:

```bash
npm install
```

Start the server:

```bash
node index.js
```

The server runs on:

```text
http://localhost:2000
```

The APIs can then be tested using Thunder Client.

> Port 2000 is used because port 5000 was already occupied by a system service on the Mac.

---

## 13. API Testing

The APIs were tested using **Thunder Client**.

### Available APIs

| **Method** | **Endpoint**     | **Purpose**                |
| ---------- | ---------------- | -------------------------- |
| POST       | `/registrations` | Register a participant     |
| GET        | `/registrations` | Retrieve all registrations |

The following cases were tested:

* Successful registration
* Multiple registrations
* Same email with a different event
* Duplicate registration for the same email and event
* Retrieving all registrations
* Data persistence after restarting the server

---

## 14. Screenshots

The following screenshots demonstrate the successful execution of the assignment.

### Screenshot 1 — Successful POST Registration

<img width="1014" height="692" alt="post-success" src="https://github.com/user-attachments/assets/a020cb54-c0e5-4423-9b8e-d6b0e3a62e3c" />


This screenshot shows a successful participant registration with a **201 Created** response.

### Screenshot 2 — GET All Registrations

<img width="1006" height="693" alt="get-registrations" src="https://github.com/user-attachments/assets/af4d2a42-4da9-4ff8-8b8a-f24d20d8c7c4" />


This screenshot shows all the registrations stored in the JSON file along with the total registration count.

### Screenshot 3 — Duplicate Registration

<img width="1014" height="701" alt="duplicate-registration" src="https://github.com/user-attachments/assets/977badbc-6378-4a2e-88c0-7d9031f8e4af" />


This screenshot shows the **409 Conflict** response when the same email tries to register for the same event again.

---

## 15. Learning Outcome

Through this assignment, I learned how to:

* Create an Express.js server.
* Handle POST and GET requests.
* Use Express middleware such as `express.json()`.
* Read data from a JSON file using `fs.readFile()`.
* Convert JSON data using `JSON.parse()`.
* Convert JavaScript data into JSON using `JSON.stringify()`.
* Write data into a file using `fs.writeFile()`.
* Generate unique IDs for registrations.
* Validate request data.
* Handle duplicate registrations.
* Store data permanently without using a database.
* Test REST APIs using Thunder Client.

---

## 16. Conclusion

This assignment successfully demonstrates the implementation of an **Event Registration API using Express.js and a JSON file**.

The application allows participants to register for events, stores their information permanently in `registrations.json`, retrieves all registrations through a GET API, and prevents duplicate registration for the same email and event.

The application also allows the same email to register for different events while maintaining unique IDs for every registration.
