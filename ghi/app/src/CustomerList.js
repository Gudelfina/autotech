import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function CustomerList() {
    const [customer, setCustomer] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8090/api/customer/';
        const response = await fetch(url);
        if(response.ok) {
            const data = await response.json();
            setCustomer(data.customer);
        }
}

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const url = `http://localhost:8090/api/customer/${id}/`;
        const response = await fetch(url, { method: 'DELETE' });
        if(response.ok) {
            fetchData();
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <div className="card shadow">
                                <div className="card-body">
                                        <h1>List of Customers</h1>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Address</th>
                                                <th>Phone Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customer.map(cust => {
                                                return (
                                                    <tr key={cust.id}>
                                                        <td>{cust.name}</td>
                                                        <td>{cust.address}</td>
                                                        <td>{cust.phone_number}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={() => handleDelete(cust.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                        <Link to="/customer/create" className="btn btn-primary btn-lg px-4 gap-3">Add a New Customer</Link>
                                    </div>
                                </div>
                                <div className="col-sm">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerList;
