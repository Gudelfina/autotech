import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom"

function AppointmentList(){
    const[appointment, setAppointment] = useState([])
    const[search, setSearch] = useState('');

    const fetchData = async () => {
        const url= 'http://localhost:8080/api/appointments/';
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            setAppointment(data.appointments)
        }
        }


    const handleDelete = async (id) => {
        const url = `http://localhost:8080/api/appointments/${id}/`;
        const response = await fetch(url, { method: 'DELETE' });
        if(response.ok) {
            fetchData();
        }
        }

    const handleComplete = async (id) => {
        const complete = appointment.find((apps) => apps.id === id);
        complete.completed = true;
        const url = `http://localhost:8080/api/appointments/${id}/`;
        const fetchConfig = {
            method: 'PUT',
            body: JSON.stringify({completed: true}),
            headers: {'Content-Type': 'application/json'}
    }
        await fetch(url, fetchConfig)
        fetchData();
    }

    const finished = appointment.filter((apps) => apps.completed === false);

    useEffect(() => {
        fetchData();
      }, []);



    return (
        <div className="container">
            <h1>Service Appointments</h1>
            <form>
                <div className='my-3'>
                    <input
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search appointments'/>
                </div>
            </form>
                <table className="table table-striped">
                <thead>
                    <tr>
                    <th>VIN</th>
                    <th>Customer Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>VIP Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointment.filter((item) => {
                        return search.toUpperCase() ===''
                        ? item
                        : item.vin.vin.toUpperCase().includes(search);
                    })
                    .filter((item) => {
                        return finished.includes(item);
                      })
                        .map(app => {
                    return (
                        <tr key={app.id}>
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
