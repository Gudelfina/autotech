import React, { useEffect, useState } from "react";

function AutomobileForm() {
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [vin, setVin] = useState("");
  const [models, setModels] = useState([]);
  const [model_id, setModel_id] = useState("");

  const fetchData = async () => {
    const url = "http://localhost:8100/api/models/";

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.color = color;
    data.year = year;
    data.vin = vin;
    data.model_id = model_id;

    const url = "http://localhost:8100/api/automobiles/";
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const automobileResponse = await fetch(url, fetchOptions);
    if (automobileResponse.ok) {
      setColor("");
      setYear("");
      setVin("");
      setModel_id("");
    }
  };

  const handleChangeColor = (event) => {
    const value = event.target.value;
    setColor(value);
  };

  const handleChangeYear = (event) => {
    const value = event.target.value;
    setYear(value);
  };

  const handleChangeVin = (event) => {
    const value = event.target.value;
    setVin(value);
  };

  const handleChangeModel = (event) => {
    const value = event.target.value;
    setModel_id(value);
  };

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
                <h1 className="card-title">Create New Automobile Inventory</h1>
                <form
                  onSubmit={handleSubmit}
                  id="create-automobile-inventory-form"
                >
                  <p className="mb-3">
                    Please enter the details of the vehicle you would like to
                    add to the inventory.
                  </p>
                  <div className="form-floating mb-3">
                    <input
                      onChange={handleChangeColor}
                      placeholder="color"
                      required
                      type="text"
                      className="form-control"
                      id="color"
                      value={color}
                    />
                    <label htmlFor="model_name">Color</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      onChange={handleChangeYear}
                      placeholder="year"
                      required
                      type="text"
                      className="form-control"
                      id="year"
                      name="year"
                      value={year}
                    />
                    <label htmlFor="picture_url">Year</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      onChange={handleChangeVin}
                      placeholder="vin"
                      required
                      type="text"
                      maxLength="17"
                      className="form-control"
                      id="vin"
                      name="vin"
                      value={vin}
                    />
                    <label htmlFor="picture_url">VIN</label>
                  </div>
                  <div className="mb-3">
                    <select
                      onChange={handleChangeModel}
                      required
                      type="text"
                      className="form-select"
                      id="model_id"
                      name="model_id"
                      value={model_id}
                    >
                      <option value="">Model</option>
                      {models.map((model_id) => {
                        return (
                          <option key={model_id.id} value={model_id.id}>
                            {model_id.name}
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

export default AutomobileForm;
