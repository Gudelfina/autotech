import React, { useEffect, useState } from "react";

function AppointmentForm() {
  const [technicians, setTechnicians] = useState([]);
  const [name, setName] = useState("");
  const [vin, setVin] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [technician, setTechnician] = useState("");

  const fetchData = async () => {
    const url = "http://localhost:8080/api/technicians/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    console.log(data);

    data.owner_name = name;
    data.vin = vin;
    data.date = date;
    data.time = time;
    data.reason = reason;
    data.technician = technician;

    const url = "http://localhost:8080/api/appointments/";
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchOptions);
    if (response.ok) {
      setName("");
      setVin("");
      setDate("");
      setTime("");
      setReason("");
      setTechnician("");
    }
  };

  const handleName = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleVin = (event) => {
    const value = event.target.value.toUpperCase();
    setVin(value);
  };

  const handleDate = (event) => {
    const value = event.target.value;
    setDate(value);
  };

  const handleTime = (event) => {
    const value = event.target.value;
    setTime(value);
  };

  const handleReason = (event) => {
    const value = event.target.value;
    setReason(value);
  };

  const handleTechnician = (event) => {
    const value = event.target.value;
    setTechnician(value);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create an Appointment</h1>
          <form onSubmit={handleSubmit} id="create-appointment-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleName}
                value={name}
                placeholder="Name"
                required
                type="text"
                name="owner_name"
                id="owner_name"
                className="form-control"
              />
              <label htmlFor="owner_name">Vehicle Owner Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleVin}
                value={vin}
                placeholder="VIN"
                required
                onkeyup="this.value = this.value.toUpperCase()"
                type="text"
                maxLength="17"
                name="vin"
                id="vin"
                className="form-control"
              />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleDate}
                value={date}
                placeholder="Date"
                required
                type="date"
                name="date"
                id="date"
                className="form-control"
              />
              <label htmlFor="date">Date</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleTime}
                value={time}
                placeholder="Time"
                required
                type="time"
                name="time"
                id="time"
                className="form-control"
              />
              <label htmlFor="Time">Time</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleReason}
                value={reason}
                placeholder="Reason"
                required
                type="text"
                name="reason"
                id="reason"
                className="form-control"
              />
              <label htmlFor="reason">Reason for service</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleTechnician}
                value={technician}
                required
                name="technician"
                id="technician"
                className="form-select"
              >
                <option value="">Assign a Technician</option>
                {technicians.map((tech) => {
                  return (
                    <option key={tech.href} value={tech.employee_id}>
                      {tech.employee_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
