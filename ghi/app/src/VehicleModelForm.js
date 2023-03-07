import React, { useEffect, useState } from 'react';

function VehicleModelForm() {
    const [name, setName] = useState('');
    const [picture_url, setPicture_url] = useState('');
    const [manufacturers, setManufacturers] = useState([]);
    const [manufacturer_id, setManufacturer_id] = useState('');

    const fetchData = async () => {

        const url = 'http://localhost:8100/api/manufacturers/';

        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.name = name;
        data.picture_url = picture_url;
        data.manufacturer_id = manufacturer_id;

        const url = 'http://localhost:8100/api/models/';
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const vehicleResponse = await fetch(url, fetchOptions);
        if (vehicleResponse.ok) {
            setName('');
            setPicture_url('');
            setManufacturer_id('');
        }
    }

    const handleChangeName = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleChangePictureUrl = (event) => {
        const value = event.target.value;
        setPicture_url(value);
    }

    const handleChangeManufacturer = (event) => {
        const value = event.target.value;
        setManufacturer_id(value);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <div className="card shadow">
                            <div className="card-body">
                                <h1 className="card-title">Enter a New Vehicle Model</h1>
                                <form onSubmit={handleSubmit} id="create-vehicle-model-form">
                                    <p className="mb-3">
                                        Please enter the details of the vehicle you would like to add.
                                    </p>
                                    <div className="form-floating mb-3">
                                        <input onChange={handleChangeName}  placeholder="name" required type="text" className="form-control" id="name" value={name} />
                                        <label htmlFor="model_name">Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={handleChangePictureUrl} placeholder="PictureUrl" required type="text" className="form-control" id="picture_url" name="picture_url" value={picture_url} />
                                        <label htmlFor="picture_url">Picture URL</label>
                                    </div>
                                    <div className="mb-3">
                                        <select onChange={handleChangeManufacturer} required type="text" className="form-select" id="manufacturer_id" name="manufacturer_id" value={manufacturer_id} >
                                            <option value="">Manufacturer</option>
                                            {manufacturers.map(manufacturer_id => {
                                                return (
                                                    <option key={manufacturer_id.id} value={manufacturer_id.id}>
                                                        {manufacturer_id.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
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

export default VehicleModelForm;
