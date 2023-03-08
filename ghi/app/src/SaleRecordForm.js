import React, { useEffect, useState } from 'react';

function SaleRecordForm() {
    const [automobile, setAutomobile] = useState('');
    const [automobiles, setAutomobiles] = useState([]);
    const [sales_person, setSales_person] = useState('');
    const [sales_persons, setSales_persons] = useState([]);
    const [customer, setCustomer] = useState('');
    const [customers, setCustomers] = useState([]);
    const [sale_price, setSale_price] = useState('');

    // const fetchData = async () => {
    //     const autosUrl = 'http://localhost:8100/api/automobiles/';

    //     const response = await fetch(autosUrl);
    //     if (response.ok) {
    //         const data = await response.json();
    //         setAutos(data.autos);
    //     }
    // }

    // const fetchData2 = async () => {
    //     const salesPersonsUrl = 'http://localhost:8090/api/sales-person/';
    //     const response = await fetch(salesPersonsUrl);
    //     if (response.ok) {
    //         const data = await response.json();

    //         setSales_persons(data.sales_persons);

    //     }
    // }

    // const fetchData3 = async () => {
    //     const customersUrl = 'http://localhost:8090/api/customer/';
    //     const response = await fetch(customersUrl);
    //     if (response.ok) {
    //         const data = await response.json();
    //         setCustomers(data.customers);
    //     }
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.automobile = automobile;
        data.sales_person = sales_person;
        data.customer = customer;
        data.sale_price = sale_price;
        const url = 'http://localhost:8090/api/sale-record/';
        console.log(data.auto)
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const saleRecordResponse = await fetch(url, fetchOptions);
        if (saleRecordResponse.ok) {
            setAutomobile('');
            setSales_person('');
            setCustomer('');
            setSale_price('');
        }
    }

    const handleChangeAuto = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    }

    const handleChangeSales_person = (event) => {
        const value = event.target.value;
        setSales_person(value);
    }

    const handleChangeCustomer = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handleChangeSale_price = (event) => {
        const value = event.target.value;
        setSale_price(value);
    }

    useEffect(() => {
        fetch('http://localhost:8100/api/automobiles/')
            .then(res => res.json())
            .then(res => setAutomobiles(res.autos))
        fetch("http://localhost:8090/api/sales-person/")
            .then(res => res.json())
            .then(res => setSales_persons(res.sales_person))
        fetch("http://localhost:8090/api/customer/")
            .then(res => res.json())
            .then(res => setCustomers(res.customer))
    }, [])

    return (
        <div className="container">
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="card-title">Create New Sale Record</h1>
                            <form onSubmit={handleSubmit} id="create-sale-record-form">
                                <p className="mb-3">
                                    Please fill out the form below to create a new sale record.
                                </p>
                                <div className="form-floating mb-3">
                                    <select onChange={handleChangeAuto} placeholder="automobile" required type="text" className="form-select" name ="automobile" id="automobile" value={automobile} >
                                    <option value="">Choose Automobile by VIN</option>
                                    {automobiles.filter(automobile=>!automobile.sold)?.map(automobile => {
                                        return (
                                            <option key={automobile.id} value={automobile.vin}>
                                                {automobile.vin}
                                            </option>
                                        )
                                    })}
                                    </select>
                                </div>
                                <div className="form-floating mb-3">
                                    <select onChange={handleChangeSales_person} placeholder="sales_person" required type="text" className="form-select" id="sales_person" name="sales_person" value={sales_person} >
                                    <option value="">Choose Sales Person</option>
                                    {sales_persons?.map(sales_person => {
                                                return (
                                                    <option key={sales_person.id} value={sales_person.id}>
                                                        {sales_person.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div className="form-floating mb-3">
                                    <select onChange={handleChangeCustomer} placeholder="customer" required type="text" className="form-select" id="customer" name="customer" value={customer} >
                                    <option value="">Choose a Customer</option>
                                    {customers?.map(customer => {
                                                return (
                                                    <option key={customer.id} value={customer.id}>
                                                        {customer.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <input onChange={handleChangeSale_price} required type="text" className="form-control" id="sale_price" name="sale_price" value={sale_price} />
                                    <label htmlFor="sale_price">Enter Sale Price</label>
                                </div>
                                <button className="btn btn-lg btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</div>
);

}

export default SaleRecordForm;
