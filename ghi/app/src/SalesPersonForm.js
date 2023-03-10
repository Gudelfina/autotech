import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

function SalesPersonForm() {
    const [name, setName] = useState('')
    const [employee_number, setEmployee_number] = useState('')


    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.name = name
        data.employee_number = employee_number

        const url = 'http://localhost:8090/api/sales-person/'
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }

        const salesPersonResponse = await fetch(url, fetchOptions)
        if (salesPersonResponse.ok) {
            setName('')
            setEmployee_number('')
        }
    }

    const handleChangeName = (event) => {
        const value = event.target.value
        setName(value)
    }

    const handleChangeEmployee_number = (event) => {
        const value = event.target.value
        setEmployee_number(value)
    }


    return (
        <div className="container">
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1>Add a Sales Person</h1>
                            <form onSubmit={handleSubmit} id="create-sales-person">
                                <p className="mb-3">
                                    Please enter the name and employee number of the sales person.
                                </p>
                                <div className="form-floating mb-3">
                                    <input onChange={handleChangeName} placeholder="name" value={name} type="text" className="form-control" id="name" />
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={handleChangeEmployee_number} placeholder="employee_number" value={employee_number} type="text" className="form-control" id="employee_number" />
                                    <label htmlFor="employee_number">Employee Number</label>
                                </div>
                                <button type="submit" className="btn btn-lg btn-primary">Submit</button>
                            </form>
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <Link to="/sales-person/" className="btn btn-primary btn-lg px-4 gap-3">View All Sales People</Link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default SalesPersonForm
