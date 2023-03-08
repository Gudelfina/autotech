import React, {useState} from 'react';

function TechnicianForm(){
    const [name, setName] = useState("");
    const [id, setId] = useState("");


    const handleName = (event) => {
        const value = event.target.value;
        setName(value);
        }

    const handleId = (event) => {
        const value = event.target.value;
        setId(value);
        }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.employee_name = name;
        data.employee_id = id;
        console.log(data)


        const url = 'http://localhost:8080/api/technicians/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            };
            const response = await fetch(url, fetchOptions);
            if (response.ok) {
                console.log(data)

                setName('');
                setId('');
            }

    }

    return(
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Technician</h1>
            <form onSubmit={handleSubmit} id="create-technician-form">
              <div className="form-floating mb-3">
                <input onChange={handleName} value={name} placeholder="Employee Name" required type="text" name="employee_name" id="employee_name" className="form-control"/>
                <label htmlFor="employee_name">Employee Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleId} value={id} placeholder="Employee ID" required type="number" name="employee_id" id="employee_id" className="form-control"/>
                <label htmlFor="employee_id">Employee ID</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default TechnicianForm;
