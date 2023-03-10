import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SalePersonDetailList() {

    const [, setSalePersonDetailLists] = useState([])
    const [sales_person, setSales_person] = useState('');
    const [sales_persons, setSales_persons] = useState([]);
    const[saleRecords, setSaleRecords] = useState([])

    const fetchData = async (sales_person_id) => {
        const url = `http://localhost:8090/api/sale-record/${sales_person_id}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSalePersonDetailLists(data.sale_record);
        }
    };

    useEffect(() => {
        fetch(`http://localhost:8090/api/sales-person/`)
            .then(res => res.json())
            .then(res => setSales_persons(res.sales_person));
        fetch(`http://localhost:8090/api/sale-record/`)
            .then(res => res.json())
            .then(res => setSaleRecords(res.sale_record));
    }, []);

    const handleChangeSales_person = (event) => {
        const value = event.target.value;
        setSales_person(value);
        fetchData(value);
    };


    const filteredSaleRecords = saleRecords.filter(saleRecord => saleRecord.sales_person.id === Number(sales_person));

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <div className="offset-3 col-8">
                        <div className="shadow p-4 mt-4">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h1>Employee Sale Records</h1>
                                    <div className="form-floating mb-3">
                                        <select
                                            onChange={handleChangeSales_person} placeholder="sales_person" requiredtype="text"className="form-select" id="sales_person"
                                            name="sales_person" value={sales_person}
                                        >
                                            <option value="">Choose Sales Person</option>
                                            {sales_persons?.map((sales_person) => {
                                                return (
                                                    <option key={sales_person.id} value={sales_person.id}>
                                                        {sales_person.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Employee Name</th>
                                                <th>Customer Name</th>
                                                <th>VIN</th>
                                                <th>Sale Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredSaleRecords?.map((saleRecord) => {
                                                return (
                                                    <tr key={saleRecord.id}>
                                                        <td>{saleRecord.sales_person.name}</td>

                                                        <td>{saleRecord.customer.name}</td>
                                                        <td>{saleRecord.vin}</td>
                                                        <td>{saleRecord.sale_price}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                        <Link to="/sale-record/create" className="btn btn-primary btn-lg px-4 gap-3">
                                            Add a New Sale Record
                                        </Link>
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

export default SalePersonDetailList;
