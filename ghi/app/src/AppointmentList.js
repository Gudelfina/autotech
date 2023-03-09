import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom"

function AppointmentList(){
    const[appointment, setAppointment] = useState([])

    const fetchData = async () => {
        const url= 'http://localhost:8080/api/appointments/';
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            setAppointment(data.appointments)
        }
        }


    useEffect(() => {
        fetchData();
      }, []);



    const handleDelete = async (id) => {
        const url = `http://localhost:8080/api/appointments/${id}/`;
        const response = await fetch(url, { method: 'DELETE' });
        if(response.ok) {
            fetchData();
        } else {
            console.log(`Failed to delete appointment with ID ${id}`);
        }
        }

    const handleComplete = async (id) => {
        const url = `http://localhost:8080/api/appointments/${id}/`;
        const response = await fetch(url, { method: 'DELETE' });
        if(response.ok) {
            fetchData();
        } else {
            console.log(`Failed to complete appointment with ID ${id}`);
        }
        }


    return (
        <div className="container">
            <h1>Service Appointments</h1>
                <table className="table table-striped">
                <thead>
                    <tr>
                    <th>VIN</th>
                    <th>Customer Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {appointment.map(app => {
                    return (
                        <tr key={app.href}>
                            <td>{app.vin.vin}</td>
                            <td>{app.owner_name}</td>
                            <td>{app.date}</td>
                            <td>{app.time}</td>
                            <td>{app.technician.employee_name}</td>
                            <td>{app.reason}</td>
                            <td>
                                <button type="button" className="btn btn-danger" onClick={ () => handleDelete(app.id)}>Cancel</button>
                            </td>
                            <td>
                                <button type="button" className="btn btn-success" onClick={ () => handleComplete(app.id)}>Finished</button>
                            </td>
                        </tr>
                    );
                    })}
                </tbody>
                </table>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <Link to="/appointment/create" className="btn btn-primary btn-lg px-4 gap-3">Add a New Appointment</Link>
                </div>
            </div>
      );
}


export default AppointmentList;
