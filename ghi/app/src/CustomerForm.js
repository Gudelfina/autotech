import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

function CustomerForm() {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone_number, setPhone_number] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.name = name
        data.address = address
        data.phone_number = phone_number

        const url = 'http://localhost:8090/api/customer/'
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }

        const customerResponse = await fetch(url, fetchOptions)
        if (customerResponse.ok) {
            setName('')
            setAddress('')
            setPhone_number('')
        }

    }

    const handleChangeName = (event) => {
        const value = event.target.value
        setName(value)
    }

    const handleChangeAddress = (event) => {
        const value = event.target.value
        setAddress(value)
    }

    const handleChangePhone_number = (event) => {
        const value = event.target.value
        setPhone_number(value)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <div className="card shadow">
                            <div className="card-body">
                                <h1>Add a Customer</h1>
                                <form onSubmit={handleSubmit} id="create-potential-customer">
                                    <p className="mb-3">
                                        Please enter the name, adresss, and phone number of the customer.
                                    </p>
                                    <div className="form-floating mb-3">
                                        <input onChange={handleChangeName} placeholder="name" value={name} type="text" className="form-control" id="name" />
                                        <label htmlFor="name">Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={handleChangeAddress} placeholder="address" value={address} type="text" className="form-control" id="employee_number" />
                                        <label htmlFor="employee_number">Address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={handleChangePhone_number} placeholder="phone_number" id="phone_number" value={phone_number} type="text" className="form-control"/>
                                        <label htmlFor="employee_number">Phone Number</label>
                                    </div>
                                    <button type="submit" className="btn btn-lg btn-primary">Submit</button>
                                </form>
                                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <Link to="/customer/" className="btn btn-primary btn-lg px-4 gap-3">View All Customers</Link>
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</div>
    )
}

export default CustomerForm
