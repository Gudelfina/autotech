import React, {useState} from 'react';



function ManufacturerForm(){
    const [manufacturer, setManufacturer] = useState("");

    const handleManufacturer = (event) => {
        const value = event.target.value;
        setManufacturer(value);
        }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = manufacturer;



        const url = 'http://localhost:8100/api/manufacturers/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            };
            const response = await fetch(url, fetchOptions);
            if (response.ok) {
                setManufacturer('');
            }
}

    return(
        <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new Manufacturer</h1>
                <form onSubmit={handleSubmit} id="create-manufacturer-form">
                  <div className="form-floating mb-3">
                    <input onChange={handleManufacturer} value={manufacturer} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control"/>
                    <label htmlFor="manufacturer">Manufacturer</label>
                  </div>
                  <button className="btn btn-lg btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
    )
};
export default ManufacturerForm;
