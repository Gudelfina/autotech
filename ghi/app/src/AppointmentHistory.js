import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom"

function AppointmentHistory(){
    const[appointment, setAppointment] = useState([])
    const[vin, setVin] = useState("")

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


    const filter = (event) =>{
        const keyword = event.target.vaue;

        if (keyword !== ''){
            const results
        }
    }


    const handleVin = (event) => {
        const value = event.target.value;
        setVin(value);
    }


    // const handleHistory = async (vin) => {
    //     const url = `http://localhost:8080/api/appointments/${vin}/`;
    //     const response = await fetch(url, { method: 'GET' });
    //     if(response.ok) {
    //         fetchData();
    //     } else {
    //         console.log(`Failed to get appointment history with vin ${vin}`);
    //     }
    //     }

    //   if(appointment === undefined) {
    //     return null;
    // }


    return (
    <div className="container">
        <div>
            <label htmlFor="site-search">Search appointment history:</label>
            <input onChange={handleVin} value={vin} type="search" id="vin" name="vin"/>
            {appointment.map(history => {
                        return (
                            <button key={history.href} onClick={ () => handleHistory(history.vin)}>Search</button>
                        );
                    })}
        </div>


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


export default AppointmentHistory;
