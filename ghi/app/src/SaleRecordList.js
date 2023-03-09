import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';


function SaleRecordList(){
    const[saleRecords, setSaleRecords] = useState([])
    const fetchData = async () => {
        const url = 'http://localhost:8090/api/sale-record/';
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            setSaleRecords(data.sale_record)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

const handleDelete = async (id) => {
    const url = `http://localhost:8090/api/sale-record/${id}/`;
    const response = await fetch(url, {method: 'DELETE'});
    if(response.ok){
        fetchData();
    } else {
        console.log(`Failed to delete sale record with ID ${id}`);
    }
}

    if(saleRecords === undefined) {
        return null;
    }

    return (
    <div className="container">
        <div className="row">
            <div className="col-sm">
                <div className="offset-3 col-7">
                    <div className="shadow p-4 mt-4">
                        <div className="card shadow">
                        <div className="card-body">
                        <h1>Sale Records</h1>
                            <table className="table table-striped">
                            <thead>
                                <tr>
                                <th>Employee Name</th>
                                <th>Employee Number</th>
                                <th>Customer Name</th>
                                <th>VIN</th>
                                <th>Sale Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {saleRecords?.map(saleRecord => {
                                return (
                                    <tr key={saleRecord.id}>
                                        <td>{saleRecord.sales_person.name}</td>
                                        <td>{saleRecord.sales_person.employee_number}</td>
                                        <td>{saleRecord.customer.name}</td>
                                        <td>{saleRecord.vin}</td>
                                        <td>{saleRecord.sale_price}</td>
                                        <td>
                                            <button
                                                type="button" className="btn btn-outline-danger btn-sm"
                                                onClick={() => handleDelete(saleRecord.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                                }
                                )}
                            </tbody>
                        </table>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <Link to="/sale-record/create" className="btn btn-primary btn-lg px-4 gap-3">Add a New Sale Record</Link>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    </div>
    );
}

export default SaleRecordList;
