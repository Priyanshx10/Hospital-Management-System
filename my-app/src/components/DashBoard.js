import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/appointments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const cancelAppointment = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/appointments/${id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(appointments.map(app => 
        app._id === id ? { ...app, status: 'cancelled' } : app
      ));
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  return (
    <div>
      <h2>Your Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            Date: {new Date(appointment.date).toLocaleString()} - 
            Doctor: {appointment.doctor.name} - 
            Status: {appointment.status}
            {appointment.status === 'booked' && (
              <button onClick={() => cancelAppointment(appointment._id)}>Cancel</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;

