import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom"

function ManufacturerList(){
    const[manufacturer, setManufacturer] = useState([])
    const fetchData = async () => {
        const url= 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            setManufacturer(data.manufacturers)
        }
        }


    useEffect(() => {
        fetchData();
      }, []);

    const handleDelete = async (id) => {
        const url = `http://localhost:8100/api/manufacturers/${id}/`;
        const response = await fetch(url, { method: 'DELETE' });
        if(response.ok) {
            fetchData();
        } else {
            console.log(`Failed to delete manufacturer with ID ${id}`);
        }
        }

      if(manufacturer === undefined) {
        return null;
    }

    return (
    <div className="container">
        <div className="row">
            <div className="col-sm">
                <div className="offset-3 col-6">
                        <div className="card-body">
                        <h1>Manufacturers</h1>
                            <table className="table table-striped">
                            <thead>
                                <tr>
                                <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {manufacturer.map(manufacturer => {
                                return (
                                    <tr key={manufacturer.id}>
                                        <td>{manufacturer.name}</td>
                                        <td>
                                            <button type="button" className="btn btn-danger" onClick={ () => handleDelete(manufacturer.id)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                                })}
                            </tbody>
                            </table>
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <Link to="/manufacturer/create" className="btn btn-primary btn-lg px-4 gap-3">Add a New Manufacturer</Link>
                            </div>
                        </div>
                        <div className="col-sm">
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default ManufacturerList;
