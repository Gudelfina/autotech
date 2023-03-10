import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";


function VehicleModelList() {
    const [models, setModels] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/';
        const response = await fetch(url);
        if(response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const url = `http://localhost:8100/api/models/${id}/`;
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
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Manufacturer</th>
                                                <th>Image</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {models.map(model => {
                                                return (
                                                    <tr key={model.id}>
                                                        <td>{model.name}</td>
                                                        <td>{model.manufacturer.name}</td>
                                                        <td>
                                                            <img
                                                                src={model.picture_url}
                                                                className="img-thumbnail"
                                                                alt="new"
                                                            />
                                                        </td>
                                                        <td>
                                                            <button
                                                                type="button" className="btn btn-outline-danger btn-sm"
                                                                onClick={() => handleDelete(model.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                        <Link to="/vehicle-model/create" className="btn btn-primary btn-lg px-4 gap-3">Add a New Vehicle Model</Link>
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


export default VehicleModelList;
