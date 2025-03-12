# BeautySalon Management System

A full-stack web application for managing a beauty salon, allowing customers to book appointments with selected masters and providing an administration interface for salon management.

## Features

### Customer Features

- Browse salon services and masters
- View masters profiles with descriptions and photos
- Book appointments by selecting a master, date, and time
- User-friendly booking form with validation

### Admin Features

- Secure admin login with JWT authentication
- Appointment management (view, edit, delete)
- Filter appointments by master and date
- Masters management (add, view, delete)
- Upload masters photos (with size and format validation)

## Technical Implementations

### Frontend

- React.js
- React Router for navigation
- Context API for state management
- CSS for styling

### Backend

- Node.js
- Express.js
- MongoDB for database
- JWT for authentication

## Project Structure

- Backend:
- `server.js` - Express server and API endpoints
- Frontend Components:
  - `App.jsx` - Main application component with routing
  - `AppointmentsManagement.jsx` - Admin interface for appointment management
  - `MasterManagement.jsx` - Admin interface for masters management
  - `RegisterForm.jsx` - Customer booking form
  - `Navbar.jsx` - Navigation component
  - `MasterContext.jsx` - Context for sharing selected master data
  - Frontend Pages:
    - `LandingPage.jsx` - Homepage with services and masters
    - `Login.jsx` - Admin login page
    - `AdminPage.jsx` - Admin page

## API Endpoints

### Authentication

- `POST /login` - Admin authentication

### Appointments

- `POST /register` - Create new appointment
- `GET /appointments` - Get all appointments (protected)
- `DELETE /appointments/:id` - Cancel appointment (protected)
- `PATCH /appointments/:id` - Update appointment details (protected)

### Masters

- `POST /masters` - Add new master
- `GET /masters` - Get all masters
- `DELETE /masters/:id` - Remove master

## Installation

1. Clone the repository

```
git clone https://github.com/la-monny/baigiamasis.git

```

2. Install backend and frontend dependencies

```
Install node modules in backend and react+vite to frontend

```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGO_URL=mongodb+srv://monny:monnydatabase@cluster1.vgdsl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1
JWT_SECRET=superstrongsecret
```

4. Start servers

```
# Start backend server
node server.js

# In a separate terminal, start frontend
cd frontend
npm run dev
```

5. Access the application

- Frontend: http://localhost:5173/
- Backend: http://localhost:5000

## Admin Access

The default admin credentials are:

- Username: admin
- Password: admin

## Author

Monika Laurinaitytė
